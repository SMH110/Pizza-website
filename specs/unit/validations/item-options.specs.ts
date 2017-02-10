import { expect } from 'chai';
import { validateOrderRequest } from '../../../shared/validation/place-order-request-validator';
import Catalogue from '../../../shared/static-data/catalogue';
import { createValidOrders, PAYMENT_METHODS } from './order-helpers';

describe("Item options", () => {
    it("Can add valid toppings to a pizza", () => {
        for (let order of createValidOrders()) {
            order.orderItems[0].options = ["Goat's Cheese"];
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
        }
    });

    it("Can't add invalid toppings to a pizza", () => {
        for (let order of createValidOrders()) {
            order.orderItems[0].options = ["Blah blah"];
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Blah blah is not a valid option for pizzas']);
        }
    });

    it("Can't add options to items that don't support options", () => {
        for (let itemType of ['salad', 'dessert', 'drink', 'calzone', 'pasta', 'side']) {
            for (let order of createValidOrders()) {
                let item = Catalogue.find(x => x.tags.some(t => t === itemType));
                order.orderItems.push({
                    name: item.name,
                    price: 13.99,
                    quantity: 1,
                    tags: item.tags,
                    options: ["Goat's Cheese"],
                    version: null
                });
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([`Options cannot be added to ${item.name}`]);
            }
        }
    });
});

