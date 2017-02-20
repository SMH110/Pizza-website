const catalogue: Item[] = [
    {
        name: 'Tuna Salad',
        price: {
            'No dressing': 5.99,
            'Balsamic vinegar & extra virgin olive oil': 5.99,
            'Caesar dressing': 5.99,
            'Both dressings': 5.99
        },
        description: 'Tomatoes, mixed leaves, tuna, anchovies and red onion',
        imageName: null,
        tags: ['salad']
    },
    {
        name: 'Chicken Caesar',
        price: {
            'No dressing': 5.99,
            'Balsamic vinegar & extra virgin olive oil': 5.99,
            'Caesar dressing': 5.99,
            'Both dressings': 5.99
        },
        description: 'Chicken, lettuce, parmesan cheese and croutons',
        imageName: null,
        tags: ['salad']
    },
    {
        name: 'Greek Salad',
        price: {
            'No dressing': 5.99,
            'Balsamic vinegar & extra virgin olive oil': 5.99,
            'Caesar dressing': 5.99,
            'Both dressings': 5.99
        },
        description: 'Feta cheese, olives, tomatoes, cucumber and mixed leaves',
        imageName: null,
        tags: ['salad']
    },
    {
        name: 'Mixed Salad',
        price: {
            'No dressing': 5.99,
            'Balsamic vinegar & extra virgin olive oil': 5.99,
            'Caesar dressing': 5.99,
            'Both dressings': 5.99
        },
        description: 'Mixed leaves, tomatoes, cucumber, red onions',
        imageName: null,
        tags: ['salad']
    },
    {
        name: 'Rocket Salad',
        price: {
            'No dressing': 5.50,
            'Balsamic vinegar & extra virgin olive oil': 5.50,
            'Caesar dressing': 5.50,
            'Both dressings': 5.50
        },
        description: 'Rocket leaves with shaved parmesan and cherry tomatoes',
        imageName: null,
        tags: ['salad']
    },
    {
        name: 'Mixed Seafood Salad',
        price: {
            'No dressing': 5.99,
            'Balsamic vinegar & extra virgin olive oil': 5.99,
            'Caesar dressing': 5.99,
            'Both dressings': 5.99
        },
        description: 'Selection of mixed seafood, mixed leaves, fresh tomatoes, onions and black olives',
        imageName: null,
        tags: ['salad']
    },
    {
        name: 'Nicoise Salad',
        price: {
            'No dressing': 5.99,
            'Balsamic vinegar & extra virgin olive oil': 5.99,
            'Caesar dressing': 5.99,
            'Both dressings': 5.99
        },
        description: 'Tuna anchovies, egg, olive, capers tomatoes and mixed leaves',
        imageName: null,
        tags: ['salad']
    },
    {
        name: 'Tricolore Salad',
        price: {
            'No dressing': 5.99,
            'Balsamic vinegar & extra virgin olive oil': 5.99,
            'Caesar dressing': 5.99,
            'Both dressings': 5.99
        },
        description: 'Buffalo mozzarella, fresh tomatoes, fresh basil and mixed leaves',
        imageName: null,
        tags: ['salad']
    },
    {
        name: 'Tiramisu',
        price: 2.99,
        description: null,
        imageName: null,
        tags: ['dessert']
    },
    {
        name: 'Chocolate Fudge Cake',
        price: 2.99,
        description: null,
        imageName: null,
        tags: ['dessert']
    },
    {
        name: 'Strawberry Cheesecake',
        price: 2.99,
        description: null,
        imageName: null,
        tags: ['dessert']
    },
    {
        name: 'Banoffee Pie',
        price: 2.99,
        description: null,
        imageName: null,
        tags: ['dessert']
    },
    {
        name: 'Haagen-Dazs Vanilla',
        price: 4.99,
        description: null,
        imageName: null,
        tags: ['ice cream']
    },
    {
        name: 'Haagen-Dazs Strawberry Cheese Cake',
        price: 4.99,
        description: null,
        imageName: null,
        tags: ['ice cream']
    },
    {
        name: 'Haagen-Dazs Pralines & Cream',
        price: 4.99,
        description: null,
        imageName: null,
        tags: ['ice cream']
    },
    {
        name: 'Haagen-Dazs Cookies & Cream',
        price: 4.99,
        description: null,
        imageName: null,
        tags: ['ice cream']
    },
    {
        name: 'Haagen-Dazs Baileys',
        price: 4.99,
        description: null,
        imageName: null,
        tags: ['ice cream']
    },
    {
        name: 'Haagen-Dazs Belgian Chocolate',
        price: 4.99,
        description: null,
        imageName: null,
        tags: ['ice cream']
    },
    {
        name: 'Can of Drink',
        description: '330ml',
        price: {
            'Coca Cola': 0.70,
            'Diet Coke': 0.70,
            'Fanta': 0.70,
            '7UP': 0.70
        },
        imageName: null,
        tags: ['drink']
    },
    {
        name: 'Bottle of Drink',
        description: '1.5 litre',
        price: {
            'Coca Cola': 1.99,
            'Diet Coke': 1.99,
            'Fanta': 1.99,
            '7UP': 1.99
        },
        imageName: null,
        tags: ['drink']
    },
    {
        name: 'Bottle of Still Water',
        description: '500ml',
        price: 0.70,
        imageName: null,
        tags: ['drink']
    },
    {
        name: 'Margherita',
        description: 'Mozzarella & Tomato Sauce',
        imageName: null,
        price: { 'Medium': 7.50, 'Large': 8.50, 'Extra Large': 10.00 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Tutto Formaggi',
        description: 'Mozzarella, Tomato Sauce, Gorgonzola Cheese, Parmesan Cheese, Ricotta Cheese',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Spinaci',
        description: 'Mozzarella, Tomato Sauce, Spinach, Feta Cheese, Black Olives, Oregano, Garlic',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Florentina',
        description: 'Mozzarella, Tomato Sauce, Spinach, Mushroom, Soft Egg, Parmesan Cheese, Garlic',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Ortolana',
        description: 'Mozzarella, Tomato Sauce, Roasted Courgette, Roasted Aubergines, Mixed Peppers, Fresh Basil',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Bufalina',
        description: 'Mozzarella, Tomato Sauce, Italian Buffalo Mozzarella, Cherry Tomatoes, Roasted Aubergines',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Vegetarian',
        description: 'Mozzarella, Tomato Sauce, Roasted Onions, Roasted Mushroom, Roasted Mixed Peppers, Sweetcorn, Black Olives',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Vegetarian Piccante',
        description: 'Mozzarella, Tomato Sauce, Roasted Mushroom, Roasted Onions, Roasted Mixed Peppers, Jalapeno Peppers, Green Chillies',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Funghi',
        description: 'Mozzarella, Tomato Sauce, Roasted Mushroom',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'vegetarian']
    },
    {
        name: 'Americana',
        description: 'Mozzarella, Tomato Sauce, Spicy Pepperoni, Roasted Mixed Pepper, Roasted Onions, Jalepeno Pepper, Chopped Tomatoes',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'hot']
    },
    {
        name: 'Parma',
        description: 'Mozzarella, Tomato Sauce, Parma Ham, Rocket Salad, Parmesan Cheese',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Classica',
        description: 'Mozzarella, Tomato Sauce, Smoked Ham, Roasted Mushroom',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Hawaiian',
        description: 'Mozzarella, Tomato Sauce, Smoked Ham & Pineapple',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Caprino',
        description: 'Mozzarella, Tomato Sauce, Chicken, Roasted Mushrooms, Cherry Tomatoes, Black Olives',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Capricciosa',
        description: 'Mozzarella, Tomato Sauce, Spicy Salami, Smoked Ham, Artichokes & Boiled Egg',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Pepperoni Deluxe',
        description: 'Mozzarella, Tomato Sauce, Spicy Pepperoni, Roasted Mushrooms, Roasted Mixed Peppers, Black Olives',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Pepperoni Plus',
        description: 'Double Pepperoni & Double Cheese',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Mexicana',
        description: 'Mozzarella, Tomato Sauce, Pepperoni, Spicy Beef, Roasted Mixed Peppers & Green Chillies',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'hot']
    },
    {
        name: 'Regina',
        description: 'Mozzarella, Tomato Sauce, Pepperoni, Roasted Mixed Peppers, Green Chillies, Roasted Onions',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'hot']
    },
    {
        name: 'Meat Feast',
        description: 'Mozzarella, Tomato Sauce, Pepperoni, Smoked Ham, Spicy Beef, Spicy Pork',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'BBQ Pizza',
        description: 'BBQ Sauce, Mozarella Cheese, Spring Onions, Chicken, Bacon, Chopped Tomatoes',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Napolitana',
        description: 'Mozzarella, Tomato Sauce, Anchovies, Capers, Black Olives, Chopped Tomatoes',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Seafood',
        description: 'Mozzarella, Tomato Sauce, Calamari, Prawns, Clams',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Torino',
        description: 'Mozzarella, Tomato Sauce, Tuna, Prawns, Anchovies, Chopped Tomatoes',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Tutto Le Carni',
        description: 'Mozzarella, Tomato Sauce, Chicken, Italian Salami, Italian Ham, Black Olives',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Sofia',
        description: 'Mozzarella, Tomato Sauce, Chicken, Pepperoni, Ham, Roasted Mushroom',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Garlic Meat Lover',
        description: 'Mozzarella, Garlic Sauce, Pepperoni, Beef, Ham, Bacon',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Godfather Special',
        description: 'Mozzarella, Tomato Sauce, Pepperoni, Ham, Beef, Salami, Mushroom, Mixed Peppers',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Gamberoni',
        description: 'Mozzarella, Tomato Sauce, Prawns, Chilli, Cherry Tomatoes',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'hot']
    },
    {
        name: 'Free Choice',
        description: 'Mozzarella, Tomato Sauce and five other toppings of your choice',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Indiana',
        description: 'Mozzarella, Tomato Sauce, Tandoori chicken, Roasted Green Chilies, Roasted Mushrooms, Mixed Peppers',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'hot']
    },
    {
        name: 'Inferno',
        description: 'Mozzarella, Tomato Sauce, Sun-dried Tomato, Olives, Mushroom, Sweetcorn, Red Onion, Chilli',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza', 'hot', 'vegetarian']
    },
    {
        name: 'Freddo',
        description: 'Mozzarella, Tomato Sauce, Beef, Fresh Garlic, Rosted Mushroom, Olives, Sundried tomatoes',
        imageName: null,
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        tags: ['pizza']
    },
    {
        name: 'Calzone Vegetariano',
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        description: 'Tomato sauce, mozzarella, roasted aubergine, roasted mushrooms, roasted green peppers, roasted courgettes & onions',
        imageName: null,
        tags: ['calzone']
    },
    {
        name: 'Calzone Meat',
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        description: 'Tomato sauce, mozzarella, Italian ham, beef, pepperoni & salami',
        imageName: null,
        tags: ['calzone']
    },
    {
        name: 'Calzone Misto',
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        description: 'Mozzarella, tomato, beef, garlic, chilli and meat balls',
        imageName: null,
        tags: ['calzone']
    },
    {
        name: 'Fish Calzone',
        price: { 'Medium': 10.99, 'Large': 12.99, 'Extra Large': 14.99 },
        description: 'Mozzarella, tomato, prawn, tuna and black olive',
        imageName: null,
        tags: ['calzone']
    },
    {
        name: 'Spaghetti Bolognese',
        price: 6.99,
        description: 'Spaghetti, meat, bolognese sauce & onion',
        imageName: null,
        tags: ['pasta']
    },
    {
        name: 'Meat Lasagne',
        price: 6.99,
        description: 'Layers of pasta with meat, tomato sauce & mozzarella gently cooked in a wood fired oven',
        imageName: null,
        tags: ['pasta']
    },
    {
        name: 'Vegetable Lasagne',
        price: 6.99,
        description: 'Layers of pasta with a mix of oven roasted vegetables with tomato sauce, gently cooked in a wood fire oven',
        imageName: null,
        tags: ['pasta']
    },
    {
        name: 'Spaghetti Carbonara',
        price: 6.99,
        description: 'Spaghetti, cheese sauce, bacon & extra virgin olive oil',
        imageName: null,
        tags: ['pasta']
    },
    {
        name: 'Chicken & Mushroom Pasta',
        price: 6.99,
        description: 'Chicken & Mushroom Pasta',
        imageName: null,
        tags: ['pasta']
    },
    {
        name: 'Festa del Bosco',
        description: 'Mushrooms in a tomato sauce with mozzarella, garlic and olive oil',
        price: 4.99,
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Cheesy chips',
        description: null,
        price: 4.00,
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Garlic Bread',
        description: null,
        price: {
            'Only garlic': 3.00,
            'With cheese': 3.50,
            'With chilli and cheese': 4.00
        },
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Bruschetta Pizza',
        description: 'Dough topped with cherry tomatoes, garlic, fresh basil, Cheese and olive oil',
        price: 4.00,
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Breaded Mozzarella Sticks',
        price: 4.99,
        description: '7 pieces',
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Potato Wedges',
        price: 3.95,
        description: null,
        imageName: '/images/sides/potato-wedges.jpg',
        tags: ['side']
    },
    {
        name: 'Potato Skins with Cheese',
        price: 4.49,
        description: '5 pieces',
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Potato Skins',
        price: 4.99,
        description: 'with your favourite topping',
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Jalapeno Cream Cheese',
        price: 4.99,
        description: '6 pieces',
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Onion Rings',
        price: 3.49,
        description: '10 pieces',
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Spicy Chicken Wings',
        price: 4.99,
        description: '8 pieces',
        imageName: '/images/sides/spicy-chicken-wings.jpg',
        tags: ['side']
    },
    {
        name: 'BBQ Wings',
        price: 4.99,
        description: '8 pieces',
        imageName: null,
        tags: ['side']
    },
    {
        name: 'BBQ Spare Ribs',
        price: 5.99,
        description: 'Half rack',
        imageName: null,
        tags: ['side']
    },
    {
        name: 'Chips',
        price: 3.00,
        description: 'Large portion',
        imageName: '/images/sides/chips.jpg',
        tags: ['side']
    },
    {
        name: 'Dips',
        price: {
            'BBQ': 0.50,
            'Sour Cream': 0.50,
            'Garlic & Herb': 0.50,
            'Chilli': 0.50
        },
        description: null,
        imageName: null,
        tags: ['side']
    }
];
export default catalogue;
