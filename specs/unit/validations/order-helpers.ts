import { PlaceOrderRequestValidationObject, OrderItemValidationObject } from '../../../shared/validation/place-order-request-validator';
import Catalogue from '../../../shared/static-data/catalogue';
import { isDeliveryAddressRequired } from '../../../shared/business-rules/delivery-address-required-rule';
import { isBillingAddressRequired } from '../../../shared/business-rules/billing-address-required-rule';

export const PAYMENT_METHODS: PaymentMethod[] = ['PayPal', 'Credit / Debit Card', 'Cash'];
const DELIVERY_METHODS: DeliveryMethod[] = ['Collection', 'Delivery'];

// HELPER METHODS
export function createValidOrders() {
    let orders = [];
    for (let deliveryMethod of DELIVERY_METHODS) {
        for (let paymentMethod of PAYMENT_METHODS) {
            orders.push(createValidOrder(deliveryMethod, paymentMethod));
        }
    }
    return orders;
}

export function createValidOrder(deliveryMethod: DeliveryMethod, paymentMethod: PaymentMethod): PlaceOrderRequestValidationObject {
    return {
        buyer: createValidBuyer(),
        date: new Date(2017, 0, 24, 20, 30, 0),
        deliveryAddress: isDeliveryAddressRequired({ deliveryMethod, paymentMethod }) ? createValidDeliveryAddress() : null,
        billingAddress: isBillingAddressRequired({ paymentMethod }) ? createValidDeliveryAddress() : null,
        deliveryMethod: deliveryMethod,
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

function createValidOrderItems(): OrderItemValidationObject[] {
    let margherita = Catalogue.find(x => x.name === 'Margherita');
    return [{
        name: margherita.name,
        price: (margherita.price as { [version: string]: number })['Extra Large'],
        quantity: 1,
        version: 'Extra Large',
        tags: margherita.tags,
        options: []
    }];
}
