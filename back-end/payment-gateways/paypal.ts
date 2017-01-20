import * as rp from 'request-promise';
import { Application } from 'express';
import Order from '../models/orders.model';

export default class PayPal implements PaymentGateway {
    constructor(private baseReturnAddress: string) {
    }

    public async createPaymentRequest(order: Order): Promise<PaymentRequestDetails> {
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
                    amount: {
                        total: order.totalPayment,
                        currency: "GBP"
                    },
                    description: this.generateDescription(order)
                }]
            },
            json: true
        };
        console.log('Requesting PayPal payment', JSON.stringify(options, null, 4));
        let response = await rp.post('https://api.sandbox.paypal.com/v1/payments/payment', options);
        return {
            paymentId: response.id,
            url: response.links.find((obj: any) => obj.rel === 'approval_url').href,
            isFullPageRedirect: true
        };
    }

    private generateDescription(order: Order) {
        return order.orderItems.reduce((initial, current) => initial + `${current.qty} ${current.item.nameAndSize || current.item.name}, `, "").slice(0, -2);
    }
}

const client_id = "AWIevBHnu9162GxBPIu9kqyNU-EB2YItx6jF6fEqQrRlqZ9I9G49tNePR_4q0IMJCRPw3XYUZbMrLEjx";
const secret = "EHFGmfZjwI5n70O9Uo73MEIIyzd0hv3mGEo0NyErBEeNXJfXOyiwa57NN4gPrQ9HA5L7EmphXyU7Vr9r";

async function getPayPalAuthToken() {
    const options = {
        headers: {
            'Authorization': 'Basic ' + new Buffer(`${client_id}:${secret}`).toString('base64')
        },
        form: { grant_type: 'client_credentials' },
        json: true
    };
    let response = await rp.post('https://api.sandbox.paypal.com/v1/oauth2/token', options);
    return response.access_token;
}

export function initialisePayPalEndpoints(application: Application) {
    // TODO: Don't initialise if PayPal is not enabled
    application.use('/paypal/execute', async (req, res) => {
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
            await Order.update({ paymentId: paymentId }, { status: "Outstanding" });
            console.log(`Updated order for ${paymentId}`);
            res.redirect('/order/success');
        } catch (error) {
            console.error('Error in /paypal/execute', error);
            return res.redirect('/order/failure');
        }
    });
}