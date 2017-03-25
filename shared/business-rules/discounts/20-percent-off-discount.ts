import { DiscountCalculationDto, DiscountRule } from './interfaces';

export const _20PercentOff: DiscountRule = {
    name: '20% off orders over £25',
    calculate(basket: DiscountCalculationDto) {
        if (basket.totalPrice >= 25) {
            return basket.totalPrice * 0.2;
        }
        return 0;
    }
}
