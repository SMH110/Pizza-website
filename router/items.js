const express = require('express');
const router = express.Router();
const pizzas = require('../models/pizzas.model');
const sides = require('../models/sides.model');
const drinks = require('../models/drinks.model');

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
    sides.find({}, (error, sides) => {
        if (error) return console.error(error);
        res.json(sides);
    });
});

router.get('/drinks', (req, res) => {
    drinks.find({}, (error, drinks) => {
        if (error) return console.error(error);
        res.json(drinks);
    });
});


module.exports = router;