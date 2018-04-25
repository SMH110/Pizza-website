import { createHash } from 'crypto';
import { stringify as stringifyQS } from 'querystring';
import { Application } from 'express';
import Order, { PersistedOrder } from '../models/orders.model';
import { PaymentGateway } from './interfaces';
import { sendOrderPlacedEmail } from '../services/email-service'
import { updateVoucherIfNecessary } from "../services/basket-service";
import { storeError } from '../services/error-service';

export const IsBarclaysEPDQEnabled = process.env.BARCLAYS_EPDQ_ENABLED === "TRUE";

const GATEWAY_ADDRESS = process.env.BARCLAYS_EPDQ_ENVIRONMENT_NAME === 'test' ?
    'https://mdepayments.epdq.co.uk/ncol/test/orderstandard_utf8.asp' :
    'https://payments.epdq.co.uk/ncol/prod/orderstandard_utf8.asp';

export default class BarclaysEPDQ implements PaymentGateway {
    constructor(private baseReturnAddress: string) { }

    public async createPaymentRedirect(order: PersistedOrder): Promise<PaymentRedirectDetails> {
        let redirectParameters = getPaymentRedirectParameters(order, this.baseReturnAddress);
        let redirectUrl = `${GATEWAY_ADDRESS}?${stringifyQS(redirectParameters)}`;
        console.log(`Barclays ePDQ redirect URL: ${redirectUrl}`);

        return {
            url: redirectUrl,
            isFullPageRedirect: true
        };
    }
}

export function initialiseBarclaysEPDQEndpoints(application: Application) {
    if (IsBarclaysEPDQEnabled === false) {
        return;
    }

    application.get('/barclays-epdq/feedback', async (req, res) => {
        try {
            const SHASIGN = req.query['SHASIGN'];
            if (!SHASIGN || SHASIGN.length === 0) {
                throw new Error(`Missing SHASIGN for ${JSON.stringify(req.query, null, 4)}`);
            }

            let feedback = Object.keys(req.query).reduce((result, key) => {
                if (key.toUpperCase() !== 'SHASIGN') {
                    (result as any)[key.toUpperCase()] = req.query[key];
                }
                return result;
            }, {}) as BarclaysEPDQPaymentFeedback;

            if (getSHASIGN(feedback, process.env.BARCLAYS_EPDQ_SHA_OUT) !== SHASIGN) {
                throw new Error(`SHASIGN check failed for ${JSON.stringify(req.query, null, 4)}`);
            }

            console.log(`Barclays ePDQ feedback received. Locating order ${feedback.ORDERID}.`);
            let order = await Order.findOne({ _id: feedback.ORDERID });

            if (order === null) {
                throw new Error(`Order ${feedback.ORDERID} not found.`);
            }

            console.log(`Updating order ${feedback.ORDERID}.`);
            order.paymentId = feedback.PAYID;
            order.paymentFeedback.push(feedback);

            let status = TRANSACTION_STATUS[feedback.STATUS];
            if (status === 'ACCEPTED') {
                order.status = 'Outstanding';
                await order.save();
                await updateVoucherIfNecessary(order);
                console.log(`Payment accepted for order. Order ${feedback.ORDERID} updated.`);
                res.redirect('/order/success');
                sendOrderPlacedEmail(order);

            } else {
                await order.save();
                console.log(`Payment NOT accepted for order. Order ${feedback.ORDERID} updated.`);
                throw new Error(`Barclays ePDQ payment not accepted. Transaction status ${status} for ${JSON.stringify(req.query, null, 4)}`);
            }
        } catch (error) {
            storeError(error);
            console.error('Error in /barclays-epdq/feedback', error);
            return res.redirect('/order/failure');
        }
    });
}

function getPaymentRedirectParameters(order: PersistedOrder, baseReturnAddress: string): BarclaysEPDQPaymentRedirectRequest {
    // Any parameters listed here should be part of the SHASIGN hash
    // https://support.epdq.co.uk/~/media/kdb/integration%20guides/sha-in_params.ashx?la=en
    let paymentRequest = {
        PSPID: process.env.BARCLAYS_EPDQ_PSPID,
        ORDERID: order._id.toString(),
        AMOUNT: Math.round(order.totalPayment * 100).toString(),
        CURRENCY: "GBP",
        LANGUAGE: 'en_GB',
        PM: 'CreditCard',
        CN: `${order.buyer.firstName} ${order.buyer.lastName}`,
        EMAIL: order.buyer.email,
        OWNERADDRESS: [order.billingAddress.line1, order.billingAddress.line2].filter(x => !!x).join(', '),
        OWNERZIP: order.billingAddress.postcode,
        OWNERTOWN: order.billingAddress.town,
        OWNERCTY: "United Kingdom",
        OWNERTELNO: order.buyer.phone,
        ACCEPTURL: `${baseReturnAddress}/barclays-epdq/feedback`,
        DECLINEURL: `${baseReturnAddress}/barclays-epdq/feedback`,
        EXCEPTIONURL: `${baseReturnAddress}/barclays-epdq/feedback`,
        CANCELURL: `${baseReturnAddress}/barclays-epdq/feedback`
    };

    return Object.assign({
        SHASIGN: getSHASIGN(paymentRequest, process.env.BARCLAYS_EPDQ_SHA_IN)
    }, paymentRequest)
}

function getSHASIGN(data: any, shaSecret: string) {
    let string = '';
    for (let key of Object.keys(data).sort()) {
        if (data[key] && data[key].length > 0) {
            string += `${key}=${data[key]}${shaSecret}`;
        }
    }
    return createHash('sha512').update(string).digest('hex').toUpperCase();
}

interface BarclaysEPDQPaymentRedirectRequest {
    // Required Parameters
    PSPID: string;
    ORDERID: string;
    AMOUNT: string;
    CURRENCY: string;
    LANGUAGE: string;
    // Fraud Protection Parameters
    CN: string;
    EMAIL: string;
    OWNERADDRESS: string;
    OWNERZIP: string;
    OWNERTOWN: string;
    OWNERCTY: string;
    OWNERTELNO: string;
    // Post payment redirection
    ACCEPTURL: string;
    DECLINEURL: string;
    EXCEPTIONURL: string;
    CANCELURL: string;
    // SHA Signature
    SHASIGN: string;
    BRAND?: 'MasterCard' | 'JCB' | 'Maestro' | 'VISA';
}

interface BarclaysEPDQPaymentFeedback {
    ACCEPTANCE: string; // Acceptance code returned by the acquirer
    AMOUNT: string; // Order amount (not multiplied by 100)
    BRAND: string; // Card brand (our system derives this from the card number)
    CARDNO: string; // Masked card number
    CN: string; // Cardholder/customer name
    CURRENCY: string; // Order currency
    ED: string; // Expiry date
    NCERROR: string; // Error code
    ORDERID: string; // Your order reference
    PAYID: string; // Payment reference in our system
    PM: string; // Payment method
    SHASIGN: string; // SHA signature calculated by our system (if SHA-OUT configured)
    STATUS: string; // Transaction status (see Status overview)
    TRXDATE: string; // Transaction date
}

// TODO - look for other status codes we have in the legacy system and
// map them here.
const TRANSACTION_STATUS: { [statusCode: string]: string } = {
    '1': 'CANCELLED',
    '2': 'DECLINED',
    '4': 'STORED',
    '5': 'AUTHORISED',
    '9': 'ACCEPTED',
    '41': 'PENDING',
    '51': 'PENDING',
    '52': 'UNCERTAIN/EXCEPTION',
    '91': 'PENDING',
    '92': 'UNCERTAIN/EXCEPTION',
    '93': 'DECLINED',
};
