const catalogue: Catalogue = {
    pizzas: [
        {
            _id: '58488a9cf36d283e14c2ec61',
            name: 'Neapolitan Pizza',
            description: 'Features tomatoes, garlic, oregano, and extra virgin olive oil.',
            imageName: 'images/pizzas/neapolitan-pizza.jpg',
            subType: ['large', 'medium', 'small'],
            price: { large: 16.99, medium: 14.99, small: 12.99 }
        },
        {
            _id: '58488b73f36d283e14c2ecb3',
            name: 'Sicilian Pizza',
            description: 'Topped with a tomato sauce, onions, herbs, anchovies, and then covered with bread crumbs.',
            imageName: 'images/pizzas/sicilian-pizza.jpg',
            subType: ['large', 'medium', 'small'],
            price: { large: 16.99, medium: 14.99, small: 12.99 }
        },
        {
            _id: '58488c55f36d283e14c2edc6',
            name: 'Mushroom pizza',
            description: 'Mushroom pizza with onion and olives oil.',
            imageName: 'images/pizzas/mushrooms-pizza.jpg',
            subType: ['large', 'medium', 'small'],
            price: { large: 16.88, medium: 14.88, small: 11.99 }
        },
        {
            _id: '58559cac734d1d400d0fea61',
            name: 'Beef Sizzler',
            description: 'Green Chillies, Jalapeños, Red Onions, Seasoned Minced Beef',
            imageName: 'images/pizzas/beef-sizzler.jpg',
            subType: ['large', 'medium', 'small'],
            price: { large: 17.99, medium: 15.99, small: 13.99 }
        }
    ],
    sides: [
        {
            _id: '5848cc83f36d287699c1e609',
            name: 'Garlic bread',
            price: 4.59,
            imageName: '/images/sides/garlic-bread.jpg'
        },
        {
            _id: '5848cd8ef36d287699c1e658',
            name: 'Cheesy chips',
            price: 5.59,
            imageName: '/images/sides/cheesy-chips.jpg'
        },
        {
            _id: '5848cde3f36d287699c1e660',
            name: 'Spicy wings',
            price: 9.89,
            imageName: '/images/sides/spicy-wings.jpg'
        },
        {
            _id: '5848ce3ef36d287699c1e66a',
            name: 'Potato wedges',
            price: 8.59,
            imageName: '/images/sides/potato-wedges.jpg'
        }
    ],
    drinks: [
        {
            _id: '5848d652f36d287699c1e79a',
            name: 'Coca Cola Diet Coke 1.75L',
            price: 1.66,
            imageName: '/images/drinks/coca-cola-diet-doke-1.75L.jpg'
        },
        {
            _id: '5848d9f0f36d287699c1e7f0',
            name: 'Pepsi Max 330ml',
            price: 0.33,
            imageName: '/images/drinks/pepsi-max-can.jpg'
        },
        {
            _id: '5848da53f36d287699c1e830',
            name: 'Fanta 330ml',
            price: 0.35,
            imageName: '/images/drinks/fanta-330.jpg'
        },
        {
            _id: '5848d74cf36d287699c1e7af',
            name: 'Pepsi Max 1.75L',
            price: 1.77,
            imageName: '/images/drinks/pepsi-max-1.75L.jpg'
        },
        {
            _id: '5848d8a0f36d287699c1e7ca',
            name: '7 Up Lemon And Lime 2 Litre Bottle',
            price: 1,
            imageName: '/images/drinks/7up-2l.jpg'
        },
        {
            _id: '5848d7f9f36d287699c1e7c0',
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