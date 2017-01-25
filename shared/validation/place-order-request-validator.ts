import { isPostcodeValid } from './delivery-area-validator';
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
    return errors;
}

function validateBasket(request: PlaceOrderRequestValidationObject): string[] {
    let errors: string[] = [];
    if (!request.orderItems || request.orderItems.length === 0) {
        errors.push('You must have at least 1 item in your basket to place an order');
    }
    return errors;
}

function validateBuyerDetails(request: PlaceOrderRequestValidationObject): string[] {
    let errors: string[] = [];
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
    if (request.deliveryMethod === 'Delivery') {
        errors.push.apply(errors, validateAddress(request.deliveryAddress, 'Delivery'));
        
        if (isNullOrWhitespace(request.deliveryAddress && request.deliveryAddress.postcode) && !isPostcodeValid(request.deliveryAddress.postcode)) {
            errors.push(`We don't deliver to your area. However, you can still place an order for collection.`);
        }
        // TODO - Validate postcode is one of the postcodes we deliver to
    }
    return errors;
}

function validateAddress(address: Address, addressType: string): string[] {
    let errors: string[] = [];
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
    let day: number = date.getDay();
    let time: number = (date.getHours() * 100) + date.getMinutes();
    if (day < 5 && time > 100 && time < 1200) {
        return false;
    }
    if (day > 4 && time > 330 && time < 1200) {
        return false;
    }
    return true;
}


export interface PlaceOrderRequestValidationObject extends PlaceOrderRequest {
    orderItems: Array<BasketItem & { price: number; }>;
    date: Date;
}