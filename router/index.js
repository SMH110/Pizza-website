const express = require('express');
const router = express.Router();

router.get('/', serveIndex);
router.get('/basket', serveIndex);
router.get('/pizza', serveIndex);
router.get('/sides', serveIndex);
router.get('/drinks', serveIndex);
router.get('/about-us', serveIndex);
router.get('/terms-and-conditions', serveIndex);
router.get('/contact-us', serveIndex);

function serveIndex(req, res) {
    res.render('index.html')
};


module.exports = router;