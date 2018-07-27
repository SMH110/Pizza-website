import { Topping } from "../dtos";

const toppings: Topping[] = [
    { type: 'Cheese', name: 'Gorgonzola' },
    { type: 'Cheese', name: 'Goat\'s Cheese' },
    { type: 'Cheese', name: 'Greek Feta Cheese' },
    { type: 'Cheese', name: 'Buffalo Mozzarella' },
    { type: 'Cheese', name: 'Parmesan Shavings' },

    { type: 'Vegetable', name: 'Fresh Tomato' },
    { type: 'Vegetable', name: 'Cherry Tomato' },
    { type: 'Vegetable', name: 'Sundried Tomato' },
    { type: 'Vegetable', name: 'Broccoli' },
    { type: 'Vegetable', name: 'Artichoke' },
    { type: 'Vegetable', name: 'Courgette' },
    { type: 'Vegetable', name: 'Roasted Mushroom' },
    { type: 'Vegetable', name: 'Roasted Aubergine' },
    { type: 'Vegetable', name: 'Onion' },
    { type: 'Vegetable', name: 'Sweetcorn' },
    { type: 'Vegetable', name: 'Rocket Salad' },
    { type: 'Vegetable', name: 'Green Chilli' },
    { type: 'Vegetable', name: 'Spinach' },
    { type: 'Vegetable', name: 'Green Pepper' },
    { type: 'Vegetable', name: 'Wild Rocket' },
    { type: 'Vegetable', name: 'Jalapeno Pepper' },
    { type: 'Vegetable', name: 'Garlic' },
    { type: 'Vegetable', name: 'Black Olives' },
    { type: 'Vegetable', name: 'Capers' },

    { type: 'Meat', name: 'Beef' },
    { type: 'Meat', name: 'Shoulder Ham' },
    { type: 'Meat', name: 'Parma Ham' },
    { type: 'Meat', name: 'Bacon' },
    { type: 'Meat', name: 'Chicken' },
    { type: 'Meat', name: 'Salami' },
    { type: 'Meat', name: 'Pepperoni' },
    { type: 'Meat', name: 'Tandoori Chicken' },
    { type: 'Meat', name: 'Meat Balls' },

    { type: 'Seafood', name: 'Prawn' },
    { type: 'Seafood', name: 'Tuna' },
    { type: 'Seafood', name: 'Anchovies' },

    { type: 'Other', name: 'Soft Egg' },
    { type: 'Other', name: 'Oregano' },
    { type: 'Other', name: 'Parsley' },
    { type: 'Other', name: 'Spring Onion' },
    { type: 'Other', name: 'Pineapple' }
];
export default toppings;

export const PizzaToppingPrices: { [pizzaSize: string]: number } = {
    'Medium': 0.90,
    'Large': 1.20,
    'Extra Large': 1.50
};
