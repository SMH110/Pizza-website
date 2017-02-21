import { isPostcodeWithinDeliveryArea } from './delivery-area-validator';
import Toppings from '../static-data/toppings';
import Catalogue from '../static-data/catalogue';
import { isDeliveryAddressRequired } from '../business-rules/delivery-address-required-rule';
import { isBillingAddressRequired } from '../business-rules/billing-address-required-rule';

export function validateOrderRequest(request: PlaceOrderRequestValidationObject, availablePaymentMethods: string[]): string[] {
    if (isShopOpen(request.date) === false) {
        return ['Sorry, the shop is now closed.'];
    }

    let errors: string[] = [];
    errors.push.apply(errors, validateBasket(request));
    if (request.deliveryMethod !== 'Collection' && request.deliveryMethod !== 'Delivery') {
        errors.push('Please select collection or delivery');
    }
    if (availablePaymentMethods.indexOf(request.paymentMethod) === -1) {
        errors.push('Please select a valid payment method');
    }
    errors.push.apply(errors, validateBuyerDetails(request));
    errors.push.apply(errors, validateDeliveryAddress(request));
    errors.push.apply(errors, validateBillingAddress(request));
    errors.push.apply(errors, isMinimumOrderSatisfied(request));
    return errors;
}

function validateBasket(request: PlaceOrderRequestValidationObject): string[] {
    let errors = [];
    if (!request.orderItems || request.orderItems.length === 0) {
        errors.push('You must have at least 1 item in your basket to place an order');
    }
    errors.push.apply(errors, validateItems(request.orderItems));
    errors.push.apply(errors, validateOptions(request.orderItems));
    return errors;
}

function validateItems(orderItems: OrderItemValidationObject[]): string[] {
    let errors = [];
    for (let item of orderItems) {
        if (Catalogue.find(i => i.name === item.name) === undefined) {
            errors.push(`${item.name} is not a valid item`);
        }
    }
    return errors;
}

function validateOptions(orderItems: OrderItemValidationObject[]): string[] {
    let errors: string[] = [];

    for (let item of orderItems) {
        if (item.tags.indexOf("pizza") !== -1) {
            errors.push.apply(errors, validatePizzaOptions(item));
        } else if (item.name === "Potato Skins") {
            errors.push.apply(errors, validatePotatoSkinOptions(item));
        } else {
            if (item.options.length > 0) {
                errors.push(`Options cannot be added to ${item.name}`);
            }
        }
    }

    return errors;
}

function validatePizzaOptions(orderItem: OrderItemValidationObject): string[] {
    let errors = [];
    if (orderItem.options.length < 1) return;

    const toppings = orderItem.options.filter(option => option !== "BBQ base");
    for (let option of toppings) {
        if (Toppings.find(topping => topping.name === option) === undefined) {
            errors.push(`${option} is not a valid option for pizzas`);
        }
    }
    if (orderItem.name === "BBQ Pizza" && orderItem.options.indexOf("BBQ base") !== -1) {
        errors.push(`BBQ base cannot be added to BBQ Pizza`);
    }
    if (orderItem.name !== "BBQ Pizza" && orderItem.options.indexOf("BBQ base") !== orderItem.options.lastIndexOf("BBQ base")) {
        errors.push(`BBQ base cannot be added more than once with ${orderItem.name}`);
    }

    return errors;
}

function validatePotatoSkinOptions(orderItem: OrderItemValidationObject): string[] {
    let errors: string[] = [];
    if (orderItem.options.length < 1) {
        errors.push(`1 topping at least must be added to ${orderItem.name}`)
    }
    for (let option of orderItem.options) {
        if (Toppings.find(topping => topping.name === option) === undefined) {
            errors.push(`${option} is not a valid topping for ${orderItem.name}`);
        }
    }

    return errors;
}

function validateBuyerDetails(request: PlaceOrderRequestValidationObject): string[] {
    let errors = [];
    if (!request.buyer) {
        errors.push('Please enter your details')
    }
    if (request.buyer && isNullOrWhitespace(request.buyer.firstName)) {
        errors.push('First name is required');
    }
    if (request.buyer && isNullOrWhitespace(request.buyer.lastName)) {
        errors.push('Last name is required');
    }
    // TODO - Shall we bother with phone number regex?
    if (request.buyer && isNullOrWhitespace(request.buyer.phone)) {
        errors.push('Phone is required');
    }
    // TODO - Shall we bother with email address regex?
    if (request.buyer && isNullOrWhitespace(request.buyer.email)) {
        errors.push('Email is required');
    }
    return errors;
}

function validateDeliveryAddress(request: PlaceOrderRequestValidationObject): string[] {
    let errors: string[] = [];
    if (isDeliveryAddressRequired(request)) {
        let nameOfAddress = request.deliveryMethod === 'Delivery' ? 'Delivery' : 'Your';
        errors.push.apply(errors, validateAddress(request.deliveryAddress, nameOfAddress));

        if (isNullOrWhitespace(request.deliveryAddress && request.deliveryAddress.postcode) === false && !isPostcodeWithinDeliveryArea(request.deliveryAddress.postcode)) {
            if (request.deliveryMethod === 'Delivery') {
                errors.push(`We don't deliver to your area. However, you can still place an order for collection.`);
            } else {
                errors.push(`We were unable to verify your address. If you still want to place collection order to be paid by cash then please call us.`);
            }
        }
    }
    return errors;
}

function validateBillingAddress(request: PlaceOrderRequestValidationObject): string[] {
    let errors: string[] = [];
    if (isBillingAddressRequired(request)) {
        errors.push.apply(errors, validateAddress(request.billingAddress, 'Billing'));
    }
    return errors;
}

function validateAddress(address: Address, addressType: string): string[] {
    let errors = [];
    if (!address) {
        errors.push(`${addressType} address is required`)
    }
    if (address && isNullOrWhitespace(address.line1)) {
        errors.push(`${addressType} address line 1 is required`);
    }
    if (address && isNullOrWhitespace(address.town)) {
        errors.push(`${addressType} town/city is required`);
    }
    if (address && isNullOrWhitespace(address.postcode)) {
        errors.push(`${addressType} postcode is required`);
    }
    // TODO - Shall we bother with a valid postcode regex? Seems like there are a lot of edge cases.
    return errors;
}

function isNullOrWhitespace(input: string) {
    return !input || input.replace(/\s/g, '').length < 1;
}

function isShopOpen(date: Date): boolean {
    let day = date.getDay();
    let time = (date.getHours() * 100) + date.getMinutes();
    if (day < 5 && time > 100 && time < 1200) {
        return false;
    }
    if (day > 4 && time > 330 && time < 1200) {
        return false;
    }
    return true;
}

function isMinimumOrderSatisfied(order: PlaceOrderRequestValidationObject): string[] {
    let totalAmountOfPizzaOrCalzone = order.orderItems.filter(x => x.tags.indexOf('pizza') !== -1 || x.tags.indexOf('calzone') !== -1).reduce((x, y) => x + y.price * y.quantity, 0);

    if (order.deliveryMethod === 'Delivery' && totalAmountOfPizzaOrCalzone < 10) {
        return ["A minimum spend of £10 is required on pizza or calzone for delivery orders."];
    }

    if (order.paymentMethod !== 'Cash' && totalAmountOfPizzaOrCalzone < 10) {
        return [`A minimum spend of £10 is required on pizza or calzone for ${order.paymentMethod} orders.`];
    }

    return [];
}

export interface PlaceOrderRequestValidationObject extends PlaceOrderRequest {
    orderItems: OrderItemValidationObject[];
    date: Date;
}

export interface OrderItemValidationObject extends BasketItem {
    price: number;
    tags: string[];
}
