import { Router } from 'express';
const router = Router();
import paypalConfig from '../config/paypal.config';
import * as rp from 'request-promise';
import Order from '../models/orders.model';
import { authenticate } from 'passport';
import * as url from 'url';
import { asyncHandler } from './router-utils';

router.post('/get-token', asyncHandler(async (req, res) => {
    let referer = url.parse(req.headers['referer']);
    let returnAddress = referer.protocol + '//' + referer.host;
    const options = {
        headers: { 'Authorization': 'Bearer ' + await getPayPalAuthToken() },
        body: {
            "intent": "sale",
            "redirect_urls": {
                "return_url": `${returnAddress}/payment/process`,
                "cancel_url": `${returnAddress}/order/failure`
            },
            // TODO: Why do we have this here? Are we limiting the customer to PayPal only?
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": req.body.transactions
        },
        json: true
    };
    console.log('Requesting PayPal payment', JSON.stringify(options));
    let response = await rp.post('https://api.sandbox.paypal.com/v1/payments/payment', options);
    const approvalUrl = response.links.find((obj: any) => obj.rel === 'approval_url');
    res.json({ approval_url: approvalUrl.href });
}));

router.post('/execute', asyncHandler(async (req, res) => {
    const options = {
        headers: { 'Authorization': 'Bearer ' + await getPayPalAuthToken() },
        body: { "payer_id": req.body.payerId },
        json: true
    };
    let response = await rp.post(`https://api.sandbox.paypal.com/v1/payments/payment/${req.body.payment_id}/execute/`, options)
    // TODO: It seems like we are not handling the PayPal response when checking if the
    // payment was approved or not (i.e. if not approved we basically leave the UI hanging)
    res.json(response);
}));


// Route to save the orders in the mongoose database
router.post('/save-order', asyncHandler(async (req, res) => {
    await new Order(req.body).save();
    res.json({
        success: true
    });
}));

// TODO: Check what happens when authenticate fails?
router.get('/get-orders', authenticate('jwt', { session: false }), asyncHandler(async (_req, res) => {
    res.json(await Order.find());
}));

// update order status
router.post('/update-status', asyncHandler(async (req, res) => {
    await Order.update({ _id: req.body.id }, { status: "Complete" });
    res.json({ success: true });
}));

async function getPayPalAuthToken() {
    const options = {
        headers: {
            'Authorization': 'Basic ' + new Buffer(`${paypalConfig.client_id}:${paypalConfig.secret}`).toString('base64')
        },
        form: { grant_type: 'client_credentials' },
        json: true
    };
    let response = await rp.post('https://api.sandbox.paypal.com/v1/oauth2/token', options);
    return response.access_token;
}

export default router;