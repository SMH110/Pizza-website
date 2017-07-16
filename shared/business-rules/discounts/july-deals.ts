import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';
import { MARGHERITA } from "../../static-data/catalogue";

export const _xLargeDeal: DiscountRule = {
    name: 'Any Extra Large pizza for £11.99',
    description: 'Any Extra Large pizza for £11.99',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Extra Large' && x.name !== MARGHERITA))));
        let timesToApply = pizzas.length;
        return sum(pizzas.slice(0, timesToApply)) - (timesToApply * 11.99);
    }
}

export const _largeDeal: DiscountRule = {
    name: 'Any Large pizza for £9.99',
    description: 'Any Large pizza for £9.99',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Large' && x.name !== MARGHERITA))));
        let timesToApply = pizzas.length;
        return sum(pizzas.slice(0, timesToApply)) - (timesToApply * 9.99);
    }
}
