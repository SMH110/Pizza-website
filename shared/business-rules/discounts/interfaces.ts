import { DeliveryMethod } from "../../dtos";

import { OrderLineItem } from "../../domain-entities";

export interface DiscountRule {
  name: string;
  calculate(basket: DiscountCalculationDto): number;
  description: string;
  discountCode?: string;
}

export interface DiscountCalculationDto {
  totalPrice: number;
  deliveryMethod: DeliveryMethod;
  date: Date;
  items: OrderLineItem[];
}
