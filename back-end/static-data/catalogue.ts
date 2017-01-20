const catalogue: Catalogue = {
    pizzas: [
        {
            name: 'Neapolitan Pizza',
            description: 'Features tomatoes, garlic, oregano, and extra virgin olive oil.',
            imageName: 'images/pizzas/neapolitan-pizza.jpg',
            price: { large: 16.99, medium: 14.99, small: 12.99 }
        },
        {
            name: 'Sicilian Pizza',
            description: 'Topped with a tomato sauce, onions, herbs, anchovies, and then covered with bread crumbs.',
            imageName: 'images/pizzas/sicilian-pizza.jpg',
            price: { large: 16.99, medium: 14.99, small: 12.99 }
        },
        {
            name: 'Mushroom pizza',
            description: 'Mushroom pizza with onion and olives oil.',
            imageName: 'images/pizzas/mushrooms-pizza.jpg',
            price: { large: 16.88, medium: 14.88, small: 11.99 }
        },
        {
            name: 'Beef Sizzler',
            description: 'Green Chillies, Jalapeños, Red Onions, Seasoned Minced Beef',
            imageName: 'images/pizzas/beef-sizzler.jpg',
            price: { large: 17.99, medium: 15.99, small: 13.99 }
        }
    ],
    sides: [
        {
            name: 'Garlic bread',
            price: 4.59,
            imageName: '/images/sides/garlic-bread.jpg'
        },
        {
            name: 'Cheesy chips',
            price: 5.59,
            imageName: '/images/sides/cheesy-chips.jpg'
        },
        {
            name: 'Spicy wings',
            price: 9.89,
            imageName: '/images/sides/spicy-wings.jpg'
        },
        {
            name: 'Potato wedges',
            price: 8.59,
            imageName: '/images/sides/potato-wedges.jpg'
        }
    ],
    drinks: [
        {
            name: 'Coca Cola Diet Coke 1.75L',
            price: 1.66,
            imageName: '/images/drinks/coca-cola-diet-doke-1.75L.jpg'
        },
        {
            name: 'Pepsi Max 330ml',
            price: 0.33,
            imageName: '/images/drinks/pepsi-max-can.jpg'
        },
        {
            name: 'Fanta 330ml',
            price: 0.35,
            imageName: '/images/drinks/fanta-330.jpg'
        },
        {
            name: 'Pepsi Max 1.75L',
            price: 1.77,
            imageName: '/images/drinks/pepsi-max-1.75L.jpg'
        },
        {
            name: '7 Up Lemon And Lime 2 Litre Bottle',
            price: 1,
            imageName: '/images/drinks/7up-2l.jpg'
        },
        {
            name: 'Fanta Orange 2 Litre Bottle',
            price: 1.85,
            imageName: '/images/drinks/fanta-2-l.jpg'
        }
    ]
};

interface Catalogue {
    drinks: Drink[];
    pizzas: Pizza[];
    sides: Side[];
}

export default catalogue;