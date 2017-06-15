import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';
import { MARGHERITA } from "../../static-data/catalogue";

export const _xLargeWeekendDeal: DiscountRule = {
    name: 'Any Extra Large pizza for £11.99 - Weekends only',
    description: 'Any Extra Large pizza for £11.99 - Friday to Sunday only',
    discountCode: 'WEEKENDXL',
    calculate(basket: DiscountCalculationDto) {
        let day = basket.date.getDay();
        if (day <= 4) {
            day += 7;
        }
        let time = (day * 10000) + (basket.date.getHours() * 100) + basket.date.getMinutes();
        if (time < 51200 || time >= 80030) {
            return 0;
        }
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Extra Large' && x.name !== MARGHERITA))));
        let timesToApply = pizzas.length;
        return sum(pizzas.slice(0, timesToApply)) - (timesToApply * 11.99);
    }
}
