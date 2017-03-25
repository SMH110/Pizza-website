import { DiscountCalculationDto, DiscountRule } from './interfaces';

export const _20PercentOff: DiscountRule = {
    name: '20% off orders over £25',
    description: 'If your basket total is more than £25 then you will get 20% off. This discount will not be applied in conjunction with any other discounts.',
    calculate(basket: DiscountCalculationDto) {
        if (basket.totalPrice >= 25) {
            return basket.totalPrice * 0.2;
        }
        return 0;
    }
}
