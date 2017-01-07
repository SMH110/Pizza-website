const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/', serveIndex);
router.get('/basket', serveIndex);
router.get('/pizza', serveIndex);
router.get('/sides', serveIndex);
router.get('/drinks', serveIndex);
router.get('/about-us', serveIndex);
router.get('/terms-and-conditions', serveIndex);
router.get('/contact-us', serveIndex);
router.get('/payment', serveIndex);
router.get('/checkout', serveIndex);
router.get('/payment/process', serveIndex);
router.get('/order/success', serveIndex);
router.get('/order/failure', serveIndex);
router.get('/admin/get-orders', serveIndex);
router.get('/admin/sign-in', serveIndex);
router.get('/admin/failure', serveIndex);

function serveIndex(req, res) {
    res.render('index.html')
};


module.exports = router;