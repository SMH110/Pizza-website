import { DiscountCalculationDto, DiscountRule } from "./interfaces";

export const _20PercentOff: DiscountRule = {
  name: "20% off orders online",
  description:
    "20% off when ordering through our website. This discount will not be applied in conjunction with any other discounts.",
  calculate(basket: DiscountCalculationDto) {
    return basket.totalPrice * 0.2;
  }
};
