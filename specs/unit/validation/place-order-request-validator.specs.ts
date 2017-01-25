import { expect } from 'chai';
import { validateOrderRequest, PlaceOrderRequestValidationObject } from '../../../shared/validation/place-order-request-validator';

const PAYMENT_METHODS = ['paypal'];

describe('Place Order Request Validator', () => {
    it('The valid test data orders are always valid', () => {
        for (let order of createValidOrders()) {
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
        }
    });

    describe('Shop Opening Times validation', () => {
        it('When the shop is closed at 1:01AM on Tuesday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 24, 1, 1, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is closed at 11:59AM on Tuesday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 24, 11, 59, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is open at 12:00PM on Tuesday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 24, 12, 0, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
            }
        });

        it('When the shop is closed at 1:01AM on Wednesday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 25, 1, 1, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is closed at 11:59AM on Wednesday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 25, 11, 59, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is open at 12:00PM on Wednesday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 25, 12, 0, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
            }
        });

        it('When the shop is closed at 1:01AM on Thursday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 26, 1, 1, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is closed at 11:59AM on Thursday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 26, 11, 59, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is open at 12:00PM on Thursday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 26, 12, 0, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
            }
        });

        it('When the shop is closed at 3:31AM on Friday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 27, 3, 31, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is closed at 11:59AM on Friday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 27, 11, 59, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is open at 12:00PM on Friday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 27, 12, 0, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
            }
        });
        it('When the shop is closed at 3:31AM on Saturday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 28, 3, 31, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is closed at 11:59AM on Saturday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 28, 11, 59, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is open at 12:00PM on Saturday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 28, 12, 0, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
            }
        });
        it('When the shop is closed at 1:01AM on Sunday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 29, 1, 1, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is closed at 11:59AM on Sunday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 29, 11, 59, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is open at 12:00PM on Sunday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 29, 12, 0, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
            }
        });
        it('When the shop is closed at 1:01AM on Monday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 30, 1, 1, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is closed at 11:59AM on Monday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 30, 11, 59, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });

        it('When the shop is open at 12:00PM on Monday', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 30, 12, 0, 0);
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
            }
        });

        it('When the shop is closed and the user has no items - only shop closed error should be returned', () => {
            for (let order of createValidOrders()) {
                order.date = new Date(2017, 0, 24, 1, 1, 0);
                order.orderItems = [];
                expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal(['Sorry, the shop is now closed.']);
            }
        });
    });
});





// HELPER METHODS
function createValidOrders() {
    return [
        createValidCollectionPayPalOrder(),
        createValidDeliveryPayPalOrder()
    ];
}

function createValidCollectionPayPalOrder(): PlaceOrderRequestValidationObject {
    return {
        buyer: createValidBuyer(),
        date: new Date(2017, 0, 24, 20, 30, 0),
        deliveryAddress: null,
        deliveryMethod: 'Collection',
        orderItems: createValidOrderItems(),
        paymentMethod: 'paypal',
        note: null
    };
}

function createValidDeliveryPayPalOrder(): PlaceOrderRequestValidationObject {
    return {
        buyer: createValidBuyer(),
        date: new Date(2017, 0, 24, 20, 30, 0),
        deliveryAddress: createValidDeliveryAddress(),
        deliveryMethod: 'Delivery',
        orderItems: createValidOrderItems(),
        paymentMethod: 'paypal',
        note: null
    };
}

function createValidBuyer(): Buyer {
    return {
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Smith',
        phone: '01234567890'
    };
}

function createValidDeliveryAddress(): Address {
    return {
        line1: 'Line 1',
        line2: null,
        town: 'Town',
        postcode: 'SE27 1AB',
    };
}

function createValidOrderItems(): Array<BasketItem & { price: number; }> {
    return [{
        name: 'Some pizza',
        price: 10,
        quantity: 1,
        version: 'Large'
    }];
}