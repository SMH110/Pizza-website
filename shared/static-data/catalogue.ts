import { Item } from "../dtos";

export const MARGHERITA = "Margherita";

const catalogue: Item[] = [
  {
    name: "Tuna Salad",
    price: {
      "No dressing": 4.99,
      "Balsamic vinegar & extra virgin olive oil": 4.99,
      "Caesar dressing": 4.99,
      "Both dressings": 4.99
    },
    description: "Tomatoes, mixed leaves, tuna, anchovies and red onion",
    imageName: "images/salad/tuna-salad.jpg",
    tags: ["salad"]
  },
  {
    name: "Chicken Caesar Salad",
    price: {
      "No dressing": 4.99,
      "Balsamic vinegar & extra virgin olive oil": 4.99,
      "Caesar dressing": 4.99,
      "Both dressings": 4.99
    },
    description: "Chicken, lettuce, parmesan cheese and croutons",
    imageName: "images/salad/chicken-caesar-salad.jpg",
    tags: ["salad"]
  },
  {
    name: "Greek Salad",
    price: {
      "No dressing": 4.99,
      "Balsamic vinegar & extra virgin olive oil": 4.99,
      "Caesar dressing": 4.99,
      "Both dressings": 4.99
    },
    description: "Feta cheese, olives, tomatoes, cucumber and mixed leaves",
    imageName: "images/salad/greek-salad.jpg",
    tags: ["salad"]
  },
  {
    name: "Mixed Salad",
    price: {
      "No dressing": 4.99,
      "Balsamic vinegar & extra virgin olive oil": 4.99,
      "Caesar dressing": 4.99,
      "Both dressings": 4.99
    },
    description: "Mixed leaves, tomatoes, cucumber and red onions",
    imageName: "images/salad/mixed-salad.jpg",
    tags: ["salad"]
  },
  {
    name: "Rocket Salad",
    price: {
      "No dressing": 4.49,
      "Balsamic vinegar & extra virgin olive oil": 4.49,
      "Caesar dressing": 4.49,
      "Both dressings": 4.49
    },
    description: "Rocket leaves with shaved parmesan and cherry tomatoes",
    imageName: "images/salad/rocket-salad.jpg",
    tags: ["salad"]
  },
  {
    name: "Nicoise Salad",
    price: {
      "No dressing": 4.99,
      "Balsamic vinegar & extra virgin olive oil": 4.99,
      "Caesar dressing": 4.99,
      "Both dressings": 4.99
    },
    description:
      "Tuna, anchovies, egg, olive, capers, tomatoes and mixed leaves",
    imageName: "images/salad/nicoise-salad.jpg",
    tags: ["salad"]
  },
  {
    name: "Tricolore Salad",
    price: {
      "No dressing": 4.99,
      "Balsamic vinegar & extra virgin olive oil": 4.99,
      "Caesar dressing": 4.99,
      "Both dressings": 4.99
    },
    description:
      "Buffalo mozzarella, fresh tomatoes, fresh basil and mixed leaves",
    imageName: "images/salad/tricolore-salad.jpg",
    tags: ["salad"]
  },
  {
    name: "Tiramisu",
    price: 2.99,
    description: null,
    imageName: "images/desserts/tiramisu.jpg",
    tags: ["dessert"]
  },
  {
    name: "Chocolate Fudge Cake",
    price: 2.99,
    description: null,
    imageName: "images/desserts/chocolate-fudge-cake.jpg",
    tags: ["dessert"]
  },
  {
    name: "Strawberry Cheesecake",
    price: 2.99,
    description: null,
    imageName: "images/desserts/strawberry-cheesecake.jpg",
    tags: ["dessert"]
  },
  {
    name: "Banoffee Pie",
    price: 2.99,
    description: null,
    imageName: "images/desserts/banoffee-pie.jpg",
    tags: ["dessert"]
  },
  {
    name: "Haagen-Dazs Vanilla",
    price: 4.99,
    description: "1 pint tub (568ml)",
    imageName: "images/ice-cream/haagen-dazs-vanilla.jpg",
    tags: ["ice cream"]
  },
  {
    name: "Haagen-Dazs Strawberry Cheesecake",
    price: 4.99,
    description: "1 pint tub (568ml)",
    imageName: "images/ice-cream/haagen-dazs-strawberry-cheesecake.jpg",
    tags: ["ice cream"]
  },
  {
    name: "Haagen-Dazs Pralines & Cream",
    price: 4.99,
    description: "1 pint tub (568ml)",
    imageName: "images/ice-cream/haagen-dazs-pralines-and-cream.jpg",
    tags: ["ice cream"]
  },
  {
    name: "Haagen-Dazs Cookies & Cream",
    price: 4.99,
    description: "1 pint tub (568ml)",
    imageName: "images/ice-cream/haagen-dazs-cookies-and-cream.jpg",
    tags: ["ice cream"]
  },
  {
    name: "Haagen-Dazs Baileys",
    price: 4.99,
    description: "1 pint tub (568ml)",
    imageName: "images/ice-cream/haagen-dazs-baileys.jpg",
    tags: ["ice cream"]
  },
  {
    name: "Haagen-Dazs Belgian Chocolate",
    price: 4.99,
    description: "1 pint tub (568ml)",
    imageName: "images/ice-cream/haagen-dazs-belgian-chocolate.jpg",
    tags: ["ice cream"]
  },
  {
    name: "Can of Coca Cola",
    description: "330ml",
    price: 0.8,
    imageName: "images/drink/coca-cola-can.jpg",
    tags: ["drink", "can"]
  },
  {
    name: "Can of Diet Coke",
    description: "330ml",
    price: 0.8,
    imageName: "images/drink/diet-coke-can.jpg",
    tags: ["drink", "can"]
  },
  {
    name: "Can of Fanta",
    description: "330ml",
    price: 0.8,
    imageName: "images/drink/fanta-can.jpg",
    tags: ["drink", "can"]
  },
  {
    name: "Can of 7UP",
    description: "330ml",
    price: 0.8,
    imageName: "images/drink/7up-can.jpg",
    tags: ["drink", "can"]
  },
  {
    name: "Bottle of Coca Cola",
    description: "1.5 litre",
    price: 1.99,
    imageName: "images/drink/coca-cola-bottle.jpg",
    tags: ["drink", "bottle"]
  },
  {
    name: "Bottle of Diet Coke",
    description: "1.5 litre",
    price: 1.99,
    imageName: "images/drink/diet-coke-bottle.jpg",
    tags: ["drink", "bottle"]
  },
  {
    name: "Bottle of Fanta",
    description: "1.5 litre",
    price: 1.99,
    imageName: "images/drink/fanta-bottle.jpg",
    tags: ["drink", "bottle"]
  },
  {
    name: "Bottle of 7UP",
    description: "1.5 litre",
    price: 1.99,
    imageName: "images/drink/7up-bottle.jpg",
    tags: ["drink", "bottle"]
  },
  {
    name: "Bottle of Water",
    description: "500ml",
    price: 0.7,
    imageName: "images/drink/bottle-of-water.jpg",
    tags: ["drink", "can"]
  },
  {
    name: MARGHERITA,
    description: "Mozzarella & Tomato Sauce",
    imageName: "images/pizza/margherita.jpg",
    price: { Medium: 7.5, Large: 8.5, "Extra Large": 10.0 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Tutto Formaggi",
    description:
      "Mozzarella, Tomato Sauce, Gorgonzola Cheese, Parmesan Cheese, Ricotta Cheese",
    imageName: "images/pizza/tutto-formaggi.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Spinaci",
    description:
      "Mozzarella, Tomato Sauce, Spinach, Feta Cheese, Black Olives, Oregano, Garlic",
    imageName: "images/pizza/spinaci.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Florentina",
    description:
      "Mozzarella, Tomato Sauce, Spinach, Mushroom, Soft Egg, Parmesan Cheese, Garlic",
    imageName: "images/pizza/florentina.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Ortolana",
    description:
      "Mozzarella, Tomato Sauce, Roasted Courgette, Roasted Aubergines, Mixed Peppers, Fresh Basil",
    imageName: "images/pizza/ortolana.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Bufalina",
    description:
      "Mozzarella, Tomato Sauce, Buffalo Mozzarella, Cherry Tomatoes, Roasted Aubergines",
    imageName: "images/pizza/bufalina.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Vegetarian",
    description:
      "Mozzarella, Tomato Sauce, Roasted Onions, Roasted Mushroom, Roasted Mixed Peppers, Sweetcorn, Black Olives",
    imageName: "images/pizza/vegetarian.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Vegetarian Piccante",
    description:
      "Mozzarella, Tomato Sauce, Roasted Mushroom, Roasted Onions, Roasted Mixed Peppers, Jalapeno Peppers, Green Chillies",
    imageName: "images/pizza/vegetarian-piccante.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Funghi",
    description: "Mozzarella, Tomato Sauce, Roasted Mushroom",
    imageName: "images/pizza/funghi.jpg",
    price: { Medium: 9.99, Large: 10.49, "Extra Large": 11.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Primavera",
    description:
      "Mozzarella, Tomato Sauce, Mixed Peppers, Roasted Courgette, Roasted Aubergines, Roasted Mushroom, Onions",
    imageName: "images/pizza/ortolana.jpg", // TODO - add Primavera photo
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "vegetarian"]
  },
  {
    name: "Americana",
    description:
      "Mozzarella, Tomato Sauce, Pepperoni, Roasted Mixed Pepper, Roasted Onions, Jalepeno Pepper, Chopped Tomatoes",
    imageName: "images/pizza/americana.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "hot"]
  },
  {
    name: "Parma",
    description:
      "Mozzarella, Tomato Sauce, Parma Ham, Rocket Salad, Parmesan Cheese",
    imageName: "images/pizza/parma.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Classica",
    description: "Mozzarella, Tomato Sauce, Ham, Roasted Mushroom",
    imageName: "images/pizza/classica.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Hawaiian",
    description: "Mozzarella, Tomato Sauce, Ham & Pineapple",
    imageName: "images/pizza/hawaiian.jpg",
    price: { Medium: 9.99, Large: 10.49, "Extra Large": 11.99 },
    tags: ["pizza"]
  },
  {
    name: "Caprino",
    description:
      "Mozzarella, Tomato Sauce, Chicken, Roasted Mushrooms, Cherry Tomatoes, Black Olives",
    imageName: "images/pizza/caprino.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Capricciosa",
    description:
      "Mozzarella, Tomato Sauce, Salami, Ham, Artichokes & Boiled Egg",
    imageName: "images/pizza/capricciosa.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Pepperoni Deluxe",
    description:
      "Mozzarella, Tomato Sauce, Pepperoni, Roasted Mushrooms, Roasted Mixed Peppers, Black Olives",
    imageName: "images/pizza/pepperoni-deluxe.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Pepperoni Plus",
    description: "Double mozzarella, Tomato Sauce and Double Pepperoni",
    imageName: "images/pizza/pepperoni-plus.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Mexicana",
    description:
      "Mozzarella, Tomato Sauce, Pepperoni, Spicy Beef, Roasted Mixed Peppers & Green Chillies",
    imageName: "images/pizza/mexicana.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "hot"]
  },
  {
    name: "Regina",
    description:
      "Mozzarella, Tomato Sauce, Pepperoni, Roasted Mixed Peppers, Green Chillies, Roasted Onions",
    imageName: "images/pizza/regina.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "hot"]
  },
  {
    name: "Meat Feast",
    description:
      "Mozzarella, Tomato Sauce, Pepperoni, Ham, Spicy Beef, Meat balls",
    imageName: "images/pizza/meat-feast.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "BBQ Pizza",
    description:
      "BBQ Sauce, Mozzarella Cheese, Spring Onions, Chicken, Bacon, Chopped Tomatoes",
    imageName: "images/pizza/bbq-pizza.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Napolitana",
    description:
      "Mozzarella, Tomato Sauce, Anchovies, Capers, Black Olives, Chopped Tomatoes",
    imageName: "images/pizza/napolitana.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Torino",
    description:
      "Mozzarella, Tomato Sauce, Tuna, Prawns, Anchovies, Chopped Tomatoes",
    imageName: "images/pizza/torino.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Tutto Le Carni",
    description: "Mozzarella, Tomato Sauce, Chicken, Salami, Ham, Black Olives",
    imageName: "images/pizza/tutto-le-carni.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Sofia",
    description:
      "Mozzarella, Tomato Sauce, Chicken, Pepperoni, Ham, Roasted Mushroom",
    imageName: "images/pizza/sofia.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Garlic Meat Lover",
    description: "Mozzarella, Garlic Sauce, Pepperoni, Beef, Ham, Bacon",
    imageName: "images/pizza/garlic-meat-lover.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza"]
  },
  {
    name: "Godfather Special",
    description:
      "Mozzarella, Tomato Sauce, Pepperoni, Ham, Beef, Salami, Mushroom, Mixed Peppers",
    imageName: "images/pizza/godfather-special.jpg",
    price: { Medium: 9.99, Large: 11.99, "Extra Large": 13.99 },
    tags: ["pizza"]
  },
  {
    name: "Free Choice",
    description:
      "Mozzarella, Tomato Sauce and five other toppings of your choice",
    imageName: "images/pizza/free-choice.jpg",
    price: { Medium: 10.99, Large: 12.99, "Extra Large": 14.99 },
    tags: ["pizza"]
  },
  {
    name: "Indiana",
    description:
      "Mozzarella, Tomato Sauce, Tandoori chicken, Roasted Green Chillies, Roasted Mushrooms and Mixed Peppers",
    imageName: "images/pizza/indiana.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "hot"]
  },
  {
    name: "Inferno",
    description:
      "Mozzarella, Tomato Sauce, Sun-dried Tomato, Olives, Mushroom, Sweetcorn, Red Onion, Chilli",
    imageName: "images/pizza/inferno.jpg",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    tags: ["pizza", "hot", "vegetarian"]
  },
  {
    name: "Calzone Vegetariano",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    description:
      "Tomato sauce, mozzarella, roasted aubergine, roasted mushrooms, roasted green peppers, roasted courgettes & onions",
    imageName: "images/calzone/calzone.jpg",
    tags: ["calzone"]
  },
  {
    name: "Calzone Meat",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    description: "Tomato sauce, mozzarella, ham, beef, pepperoni & salami",
    imageName: "images/calzone/calzone.jpg",
    tags: ["calzone"]
  },
  {
    name: "Calzone Misto",
    price: { Medium: 9.99, Large: 10.99, "Extra Large": 12.99 },
    description: "Mozzarella, tomato, beef, garlic, chilli and meat balls",
    imageName: "images/calzone/calzone.jpg",
    tags: ["calzone"]
  },
  {
    name: "Spaghetti Bolognese",
    price: 5.99,
    description: "Spaghetti, meat, bolognese sauce & onion",
    imageName: "images/pasta/spaghetti-bolognese.jpg",
    tags: ["pasta"]
  },
  {
    name: "Meat Lasagne",
    price: 5.99,
    description: "Layers of pasta with meat, tomato sauce & mozzarella",
    imageName: "images/pasta/meat-lasagne.jpg",
    tags: ["pasta"]
  },
  {
    name: "Vegetable Lasagne",
    price: 5.99,
    description:
      "Layers of pasta with a mix of oven roasted vegetables with tomato sauce",
    imageName: "images/pasta/vegetable-lasagne.jpg",
    tags: ["pasta"]
  },
  {
    name: "Spaghetti Carbonara",
    price: 5.99,
    description: "Spaghetti, cheese sauce, bacon & extra virgin olive oil",
    imageName: "images/pasta/spaghetti-carbonara.jpg",
    tags: ["pasta"]
  },
  {
    name: "Chicken & Mushroom Pasta",
    price: 5.99,
    description: "Chicken & Mushroom Pasta",
    imageName: "images/pasta/chicken-mushroom-pasta.jpg",
    tags: ["pasta"]
  },
  {
    name: "Festa del Bosco",
    description:
      "Mushrooms in a tomato sauce with mozzarella, garlic and olive oil",
    price: 4.99,
    imageName: "images/sides/festa-del-bosco.jpg",
    tags: ["side"]
  },
  {
    name: "Cheesy chips",
    description: null,
    price: 4.0,
    imageName: "images/sides/cheesy-chips.jpg",
    tags: ["side"]
  },
  {
    name: "Garlic Bread",
    description: null,
    price: {
      "Only garlic": 3.0,
      "With cheese": 3.5,
      "With chilli and cheese": 4.0
    },
    imageName: "images/sides/garlic-bread.jpg",
    tags: ["side"]
  },
  {
    name: "Bruschetta Pizza",
    description:
      "Dough topped with cherry tomatoes, garlic, fresh basil, Cheese and olive oil",
    price: 4.0,
    imageName: "images/sides/bruschetta-pizza.jpg",
    tags: ["side"]
  },
  {
    name: "Breaded Mozzarella Sticks",
    price: 4.99,
    description: "7 pieces",
    imageName: "images/sides/breaded-mozzarella-sticks.jpg",
    tags: ["side"]
  },
  {
    name: "Potato Wedges",
    price: 3.95,
    description: null,
    imageName: "/images/sides/potato-wedges.jpg",
    tags: ["side"]
  },
  {
    name: "Potato Skins with Cheese",
    price: 4.49,
    description: "5 pieces",
    imageName: "images/sides/potato-skins-with-cheese.jpg",
    tags: ["side"]
  },
  {
    name: "Potato Skins",
    price: 4.99,
    description: "with your favourite topping",
    imageName: "images/sides/potato-skins.jpg",
    tags: ["side"]
  },
  {
    name: "Jalapeno Cream Cheese",
    price: 4.99,
    description: "6 pieces",
    imageName: "images/sides/jalapeno-cream-cheese.jpg",
    tags: ["side"]
  },
  {
    name: "Onion Rings",
    price: 3.49,
    description: "10 pieces",
    imageName: "images/sides/onion-rings.jpg",
    tags: ["side"]
  },
  {
    name: "Spicy Chicken Wings",
    price: 4.99,
    description: "8 pieces",
    imageName: "/images/sides/spicy-chicken-wings.jpg",
    tags: ["side"]
  },
  {
    name: "BBQ Wings",
    price: 4.99,
    description: "8 pieces",
    imageName: "images/sides/bbq-wings.jpg",
    tags: ["side"]
  },
  {
    name: "BBQ Spare Ribs",
    price: 5.99,
    description: "Half rack",
    imageName: "images/sides/bbq-spare-ribs.jpg",
    tags: ["side"]
  },
  {
    name: "Chips",
    price: 3.0,
    description: "Large portion",
    imageName: "/images/sides/chips.jpg",
    tags: ["side"]
  },
  {
    name: "Dips",
    price: {
      BBQ: 0.5,
      "Sour Cream": 0.5,
      "Garlic & Herb": 0.5,
      Chilli: 0.5
    },
    description: "Choose your favourite dip",
    imageName: "images/sides/dips.jpg",
    tags: ["side"]
  }
];
export default catalogue;
