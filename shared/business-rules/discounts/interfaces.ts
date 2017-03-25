export interface DiscountRule {
    name: string;
    calculate(basket: DiscountCalculationDto): number;
    description?: string;
}

export interface DiscountCalculationDto {
    totalPrice: number;
    deliveryMethod: DeliveryMethod;
    items: OrderLineItem[];
}
