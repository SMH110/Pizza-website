import { DeliveryMethod, PaymentMethod } from "../dtos";

export function isDeliveryAddressRequired(dto: DeliveryAddressRequiredRuleDto) {
    if (dto.deliveryMethod === 'Delivery') {
        return true;
    }
    if (dto.paymentMethod === 'Cash') {
        return true;
    }
    return false;
}

interface DeliveryAddressRequiredRuleDto {
    deliveryMethod: DeliveryMethod;
    paymentMethod: PaymentMethod;
}
