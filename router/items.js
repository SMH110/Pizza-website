const express = require('express');
const router = express.Router();
const products = require('../models/products.model');

router.get('/pizzas', (req, res) => {
    pizzas.find({}, (error, pizzas) => {
        if (error) {
            res.json(error);
            console.error(error);
            return;
        }
        res.json(pizzas);
    });

});

router.get('/sides', (req, res) => {
    products.find({ type: "side" }, (error, sides) => {
        if (error) return console.error(error);
        res.json(sides);
    });
});

router.get('/drinks', (req, res) => {
    products.find({ type: "drink" }, (error, drinks) => {
        if (error) return console.error(error);
        res.json(drinks);
    });
});


module.exports = router;