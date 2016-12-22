const express = require('express');
const router = express.Router();
const http = require('http');
const querystring = require('querystring');
const paypalConfig = require('../config/paypal.config');
router.post('/get-token', (req, res) => {
    console.log(JSON.stringify(req.body, null, 1));
    const orderBody = req.body;
    const options = {
        host: 'https://api.sandbox.paypal.com',
        path: '/v1/oauth2/token',
        method: 'POST',
        port: 80,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + new Buffer(`${paypalConfig.client_id}:${paypalConfig.secret}`).toString('base64')
        }
    }
    var data = querystring.stringify({
        grant_type: 'client_credentials'
    });
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log("body: " + chunk);
        });

        res.on('error', (error) => {
            console.log(error);
        })
    });

    req.write(data);
    req.end();
    res.json({
        message: "hello from the back-end"
    })
});

module.exports = router;