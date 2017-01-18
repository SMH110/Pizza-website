import { Router } from 'express';
const router = Router();
import paypalConfig from '../config/paypal.config';
import * as requestPromise from 'request-promise';
import Order from '../models/orders.model';
import {authenticate} from 'passport';
import * as url from 'url';

router.post('/get-token', (req, res) => {
    const orderBody = req.body;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + new Buffer(`${paypalConfig.client_id}:${paypalConfig.secret}`).toString('base64')
        },
        uri: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        form: {
            grant_type: 'client_credentials'
        }
    };
    requestPromise(options)
        .then(response => {
            response = JSON.parse(response);
            return response.access_token;
        })
        .then(token => {
            let referer = url.parse(req.headers['referer']);
            let returnAddress = referer.protocol + '://' + referer.host;
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                uri: 'https://api.sandbox.paypal.com/v1/payments/payment',
                body: {
                    "intent": "sale",
                    "redirect_urls": {
                        "return_url": `${returnAddress}/payment/process`,
                        "cancel_url": `${returnAddress}/order/failure`
                    },
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "transactions": orderBody.transactions
                },
                json: true
            };
            return requestPromise(options);
        }).then(response => {
            const approvalUrl = response.links.find((obj: any) => obj.rel === 'approval_url');
            res.json({ approval_url: approvalUrl.href });
        }).catch(error => {
            console.error(error);
            res.status(500);
        });
});


router.post('/execute', (req, res) => {
    const executePostBody = req.body;
    const getNewTokenOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + new Buffer(`${paypalConfig.client_id}:${paypalConfig.secret}`).toString('base64')
        },
        uri: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        form: {
            grant_type: 'client_credentials'
        }
    };
    requestPromise(getNewTokenOptions)
        .then(response => {
            response = JSON.parse(response);
            return response.access_token;
        }).then(token => {
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                uri: `https://api.sandbox.paypal.com/v1/payments/payment/${executePostBody.payment_id}/execute/`,
                body: {
                    "payer_id": executePostBody.payerId
                },
                json: true
            };
            return requestPromise(options)
        })
        .then(response => {
            res.json(response);
        }).catch(error => {
            console.error(error);
            res.status(500).send("error")
        });
});


// Route to save the orders in the mongoose database
router.post('/save-order', (req, res) => {
    const order = new Order(req.body);
    order.save(error => {
        if (error) {
            res.status(500).send();
            return;
        }
        res.json({
            success: true
        });
    })
});

router.get('/get-orders', authenticate('jwt', { session: false }), (_req, res) => {
    Order.find({}, (error, orders) => {
        if (error) {
            res.status(500).send(error);
            return console.error(error);
        }

        res.json(orders);
    });
});

// update order status
router.post('/update-status', (req, res) => {
    Order.update({ _id: req.body.id }, { status: "Complete" }, (error) => {
        if (error) {
            res.status(500).send(error);
            return console.error(error);
        }

        res.json({ success: true });
    });
});

export default router;