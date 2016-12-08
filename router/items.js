const express = require('express');
const router = express.Router();
const pizzas = require('../models/pizzas.model');
router.get('/pizzas', (req, res) => {
    

    pizzas.find({}, (error, pizzas) => {
        if (error) return console.error(error);
        res.json(pizzas)
    });

})


module.exports = router;