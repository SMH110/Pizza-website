import { expect } from 'chai';
import { validateOrderRequest } from '../../../shared/validation/place-order-request-validator';
import { createValidOrders, createValidOrder, PAYMENT_METHODS } from './order-helpers';

describe('Minimum Order Values', () => {
    it('When the total amount spent on pizza is less than 10 - Should return the expected results', () => {
        let testCases = [
            { deliveryMethod: 'Delivery', paymentMethod: 'Cash', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'JCB', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'Maestro', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'MasterCard', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'PayPal', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'VISA', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'Cash', expectedErrors: [] },
            { deliveryMethod: 'Collection', paymentMethod: 'JCB', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for JCB orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'Maestro', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for Maestro orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'MasterCard', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for MasterCard orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'PayPal', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for PayPal orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'VISA', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for VISA orders.'] },
        ] as TestCase[];

        for (let testCase of testCases) {
            let order = createValidOrder(testCase.deliveryMethod, testCase.paymentMethod);
            order.orderItems[0].tags = ['pizza'];
            order.orderItems[0].price = 9;
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(testCase.expectedErrors)
        }
    });

    it('When the total amount spent on calzone is less than 10 - Should return the expected results', () => {
        let testCases = [
            { deliveryMethod: 'Delivery', paymentMethod: 'Cash', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'JCB', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'Maestro', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'MasterCard', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'PayPal', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'VISA', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'Cash', expectedErrors: [] },
            { deliveryMethod: 'Collection', paymentMethod: 'JCB', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for JCB orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'Maestro', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for Maestro orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'MasterCard', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for MasterCard orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'PayPal', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for PayPal orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'VISA', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for VISA orders.'] },
        ] as TestCase[];

        for (let testCase of testCases) {
            let order = createValidOrder(testCase.deliveryMethod, testCase.paymentMethod);
            order.orderItems[0].tags = ['calzone'];
            order.orderItems[0].price = 9;
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(testCase.expectedErrors)
        }
    });

    it('When the total amount is greater than 10, but not on calzone/pizza - Should return the expected results', () => {
        let testCases = [
            { deliveryMethod: 'Delivery', paymentMethod: 'Cash', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'JCB', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'Maestro', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'MasterCard', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'PayPal', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Delivery', paymentMethod: 'VISA', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for delivery orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'Cash', expectedErrors: [] },
            { deliveryMethod: 'Collection', paymentMethod: 'JCB', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for JCB orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'Maestro', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for Maestro orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'MasterCard', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for MasterCard orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'PayPal', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for PayPal orders.'] },
            { deliveryMethod: 'Collection', paymentMethod: 'VISA', expectedErrors: ['A minimum spend of £10 is required on pizza or calzone for VISA orders.'] },
        ] as TestCase[];

        for (let testCase of testCases) {
            let order = createValidOrder(testCase.deliveryMethod, testCase.paymentMethod);
            order.orderItems[0].tags = ['side'];
            order.orderItems[0].price = 20;
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(testCase.expectedErrors)
        }
    });

    it('When the total amount spent on pizza is equal to 10 - Should pass validation', () => {
        for (let order of createValidOrders()) {
            order.orderItems[0].tags = ['pizza'];
            order.orderItems[0].price = 10;
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([])
        }
    });

    it('When the total amount spent on calzone is equal to 10 - Should pass validation', () => {
        for (let order of createValidOrders()) {
            order.orderItems[0].tags = ['calzone'];
            order.orderItems[0].price = 10;
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
        }
    });

    it('When the total amount spent on pizza is more than 10 - Should pass validation', () => {
        for (let order of createValidOrders()) {
            order.orderItems[0].tags = ['pizza'];
            order.orderItems[0].price = 10.01;
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([])
        }
    });

    it('When the total amount spent on calzone is more than 10 - Should pass validation', () => {
        for (let order of createValidOrders()) {
            order.orderItems[0].tags = ['calzone'];
            order.orderItems[0].price = 10.01;
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
        }
    });

    it('When the total amount spent on pizza and calzone collectively is more than 10 - Should pass validation', () => {
        for (let order of createValidOrders()) {
            order.orderItems[0].tags = ['pizza'];
            order.orderItems[0].price = 5.01;
            order.orderItems.push(Object.assign({}, order.orderItems[0]));
            order.orderItems[1].tags = ['calzone'];
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([])
        }
    });
});

interface TestCase {
    deliveryMethod: DeliveryMethod;
    paymentMethod: PaymentMethod;
    expectedErrors: string[];
}
