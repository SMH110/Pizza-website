import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const _anyPizza_9_99: DiscountRule = {
    name: 'Any pizza any size for £9.99',
    description: 'Any pizza any size for £9.99',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1))));
        let timesToApply = pizzas.length;
        return sum(pizzas.slice(0, timesToApply)) - (timesToApply * 9.99);
    }
}
