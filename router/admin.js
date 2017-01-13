const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/token.config');
const User = require('../models/user.model');
const passport = require('passport');

router.post('/sign-in', (req, res) => {

    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) {
            res.json({ success: false, message: "Some Error" });
            return console.error(error)
        }
        if (!user || !user.validatePassword(req.body.password)) {
            res.json({
                success: false,
                message: "Wrong email or password!"
            });

            return;
        }
        let token = jwt.sign(user, tokenConfig.secret, {
            expiresIn: 1000 * 60
        })
        res.json({ success: true, token: `JWT ${token}` });
    });
});

module.exports = router;