import * as rp from 'request-promise';
import { Application } from 'express';
import Order, { PersistedOrder } from '../models/orders.model';
import { PaymentGateway } from './interfaces';

export const IsPayPalEnabled = process.env.PAYPAL_ENABLED === "TRUE";

export default class PayPal implements PaymentGateway {
    constructor(private baseReturnAddress: string) {
    }

    public async createPaymentRedirect(order: PersistedOrder): Promise<PaymentRedirectDetails> {
        const options = {
            headers: { 'Authorization': 'Bearer ' + await getPayPalAuthToken() },
            body: {
                "intent": "sale",
                "redirect_urls": {
                    "return_url": `${this.baseReturnAddress}/paypal/execute`,
                    "cancel_url": `${this.baseReturnAddress}/order/failure`
                },
                // TODO: Why do we have this here? Are we limiting the customer to PayPal only?
                "payer": {
                    "payment_method": "paypal"
                },
                "transactions": [{
                    item_list: {
                        items: order.orderItems.map(x => ({
                            "name": x.name + (x.version ? ' - ' + x.version : ''),
                            "price": x.price,
                            "currency": "GBP",
                            "quantity": x.quantity
                        }))
                    },
                    amount: {
                        total: order.totalPayment,
                        currency: "GBP"
                    },
                    description: 'Website Order'
                }]
            },
            json: true
        };
        console.log('Requesting PayPal payment', JSON.stringify(options, null, 4));
        let response = await rp.post('https://api.sandbox.paypal.com/v1/payments/payment', options);
        console.log('PayPal payment successfully requested. Updating order.', JSON.stringify(response, null, 4));
        order.paymentId = response.id;
        order.save()
        console.log('Order successfully updated.', JSON.stringify(options, null, 4));
        return {
            url: response.links.find((obj: any) => obj.rel === 'approval_url').href,
            isFullPageRedirect: true
        };
    }
}

async function getPayPalAuthToken() {
    const options = {
        headers: {
            'Authorization': 'Basic ' + new Buffer(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')
        },
        form: { grant_type: 'client_credentials' },
        json: true
    };
    let response = await rp.post('https://api.sandbox.paypal.com/v1/oauth2/token', options);
    return response.access_token;
}

export function initialisePayPalEndpoints(application: Application) {
    if (IsPayPalEnabled === false) {
        return;
    }

    application.get('/paypal/execute', async (req, res) => {
        try {
            let paymentId = req.query['paymentId'];
            let payerId = req.query['PayerID'];
            const options = {
                headers: { 'Authorization': 'Bearer ' + await getPayPalAuthToken() },
                body: { "payer_id": payerId },
                json: true
            };
            console.log(`Executing payment ${paymentId} for ${payerId}`);
            let response = await rp.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute/`, options);
            if (response.state !== 'approved') {
                throw new Error(`Payment ${paymentId} for ${payerId} was NOT approved`);
            }
            console.log(`Payment ${paymentId} for ${payerId} approved. Updating order...`);
            let order = await Order.findOne({ paymentId: paymentId });
            if (!order) {
                throw new Error(`PayPal Gateway could not find order with paymentId: ${paymentId}`);
            }
            order.status = "Outstanding";
            order.paymentFeedback.push(response);
            console.log(`Updated order for ${paymentId}`);
            res.redirect('/order/success');
        } catch (error) {
            console.error('Error in /paypal/execute', error);
            return res.redirect('/order/failure');
        }
    });
}