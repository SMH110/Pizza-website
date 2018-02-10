import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';
import { MARGHERITA } from "../../static-data/catalogue";

export const _extraLargePizzaSideAndCanDeal: DiscountRule = {
    name: 'Any Extra Large pizza, a side and a can of drink for £16.99',
    description: 'Any Extra Large pizza, a side (excluding dips) and a can of drink for £16.99',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Extra Large' && x.name !== MARGHERITA))));
        let sides = sortByPrice(flatten(basket.items.filter(x => x.tags.indexOf('side') !== -1 && x.name !== 'Dips')));
        let cans = sortByPrice(flatten(basket.items.filter(x => x.tags.indexOf('drink') !== -1 && x.tags.indexOf('can') !== -1)));
        let timesToApply = Math.min(pizzas.length, sides.length);
        return sum(pizzas.slice(0, timesToApply)) + sum(sides.slice(0, timesToApply)) + sum(cans.slice(0, timesToApply)) - (timesToApply * 16.99);
    }
}
