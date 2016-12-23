const express = require('express');
const router = express.Router();
const https = require('https');
const querystring = require('querystring');
const paypalConfig = require('../config/paypal.config');
const requestPromise = require('request-promise');

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
    let accessToken;
    requestPromise(options)
        .then(response => {
            response = JSON.parse(response);
            return response.access_token;
        })
        .then(token => {
            accessToken = token;
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
                        "return_url": "http://localhost:3000/payment/process",
                        "cancel_url": "http://localhost:3000/basket"
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
            const approvalUrl = response.links.filter(obj => obj.rel === 'approval_url')[0];
            const executeUrl = response.links.filter(obj => obj.rel === 'execute')[0];
            const dataToBeRespondedWith = {
                approval_url: approvalUrl.href,
                execute_url: executeUrl.href,
                access_token: accessToken ? accessToken : 'error'

            }
            res.json(dataToBeRespondedWith || { "error": "/errors/error-getting-approval_url" });
        }).catch(console.error);
});


router.post('/execute', (req, res) => {
    console.log(req.body);


    // todo -> get another Authorization token from paypal
    const executePostBody = req.body;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + executePostBody.Authorization
        },
        // todo -> make up the execute link from the payment ID
        uri: `https://api.sandbox.paypal.com/v1/payments/payment/${executePostBody.payment_id}/execute/`,
        body: {
            "payer_id": executePostBody.payer_id
        },
        json: true
    };

    console.log("      ------------------------>   Payer ID", options.body.payer_id);
    requestPromise(options)
        .then(response => {
            res.json(response);
        }).catch(console.error);

});


module.exports = router;