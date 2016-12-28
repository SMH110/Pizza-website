const express = require('express');
const router = express.Router();
const products = require('../models/products.model');

router.get('/pizzas', (req, res) => {
    products.find({ type: "pizza" }, (error, pizzas) => {
        if (error) return console.log(error);
        let pizzasProducts = [];
        while (pizzas.length) {
            let firstPizzaItem = pizzas[0].name;
            let PizzasWithSameName = pizzas.filter(item => item.name === firstPizzaItem);
            let prices = []
            PizzasWithSameName.forEach(item => {
                prices.push(item.price)
            })
            prices = prices.sort((a, b) => b - a);
            let pizzaGroup = {
                _id: pizzas[0]._id,
                name: firstPizzaItem,
                imageUrl: pizzas[0].imageUrl,
                price: {
                    large: prices[0],
                    medium: prices[1],
                    small: prices[2]
                },
                size: ["large", "medium", "small"],
                description: pizzas[0].description
            }
            pizzasProducts.push(pizzaGroup);
            pizzas = pizzas.filter(item => item.name !== firstPizzaItem);


        }
        res.json(pizzasProducts);
    })
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