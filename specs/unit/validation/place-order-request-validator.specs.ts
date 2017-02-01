import { expect } from 'chai';
import { validateOrderRequest, PlaceOrderRequestValidationObject } from '../../../shared/validation/place-order-request-validator';

const PAYMENT_METHODS: PaymentMethod[] = ['PayPal', 'MasterCard', 'JCB', 'Maestro', 'VISA', 'Cash'];
const DELIVERY_METHODS: DeliveryMethod[] = ['Collection', 'Delivery'];

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
    describe('Order Minimum Value Validation', () => {
        describe('When the delivery method is Delivery', () => {
            let deliveryOrder: any = {
                buyer:
                {
                    email: 'test@test.com',
                    firstName: 'John',
                    lastName: 'Smith',
                    phone: '01234567890'
                },
                date: new Date(2017, 0, 24, 20, 30, 0),
                deliveryAddress: {
                    line1: 'Line 1',
                    line2: null,
                    town: 'Town',
                    postcode: 'SE27 1AB',
                },
                deliveryMethod: 'Delivery',
                orderItems:
                [{
                    name: 'Some pizza',
                    price: 10,
                    quantity: 1,
                    version: 'Large',
                    tags: ['pizza']
                }],
                paymentMethod: 'MasterCard',
                note: null
            }
            describe('When the price of pizzas is less than  10', () => {
                beforeEach(() => {
                    deliveryOrder.orderItems[0].price = 9;
                });
                it('When the total pizza is less than 10 - Should return the error message ', () => {
                    expect(validateOrderRequest(deliveryOrder, PAYMENT_METHODS)).to.be.deep.equal(['A minimum spend of £10 is required on pizza or calzone for delivery orders.'])
                });
            });
            describe('When the price of pizzas is equal to 10', () => {
                beforeEach(() => {
                    deliveryOrder.orderItems[0].price = 10;
                });
                it('When the total pizza is less than 10 - Should return the error message ', () => {
                    expect(validateOrderRequest(deliveryOrder, PAYMENT_METHODS)).to.be.deep.equal([])
                });
            });
            describe('When the price of pizzas is more than 10', () => {
                beforeEach(() => {
                    deliveryOrder.orderItems[0].price = 12;
                });
                it('When the total pizza is less than 10 - Should return the error message ', () => {
                    expect(validateOrderRequest(deliveryOrder, PAYMENT_METHODS)).to.be.deep.equal([])
                });
            });
        });
    });
});


// HELPER METHODS
function createValidOrders() {
    let orders = [];
    for (let deliveryMethod of DELIVERY_METHODS) {
        for (let paymentMethod of PAYMENT_METHODS) {
            orders.push(createValidOrder(deliveryMethod, paymentMethod));
        }
    }
    return orders;
}

function createValidOrder(deliveryMethod: DeliveryMethod, paymentMethod: PaymentMethod): PlaceOrderRequestValidationObject {
    return {
        buyer: createValidBuyer(),
        date: new Date(2017, 0, 24, 20, 30, 0),
        deliveryAddress: deliveryMethod === 'Collection' ? createValidDeliveryAddress() : null,
        deliveryMethod: 'Collection',
        orderItems: createValidOrderItems(),
        paymentMethod: paymentMethod,
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

function createValidOrderItems(): Array<BasketItem & { price: number; tags: string[] }> {
    return [{
        name: 'Some pizza',
        price: 10,
        quantity: 1,
        version: 'Large',
        tags: ['pizza']
    }];
}
