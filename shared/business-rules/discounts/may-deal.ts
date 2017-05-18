import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';
import { MARGHERITA } from "../../static-data/catalogue";

export const _largeDeal: DiscountRule = {
    name: 'Any Large pizza for £10',
    description: 'Any Large pizza for £10',
    discountCode: 'LARGEDEAL',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Large' && x.name !== MARGHERITA))));
        let timesToApply = pizzas.length;
        return sum(pizzas.slice(0, timesToApply)) - (timesToApply * 10);
    }
}

export const _xLargeDeal: DiscountRule = {
    name: 'Any Extra Large pizza for £12.99',
    description: 'Any Extra Large pizza for £12.99',
    discountCode: 'XLDEAL',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Extra Large' && x.name !== MARGHERITA))));
        let timesToApply = pizzas.length;
        return sum(pizzas.slice(0, timesToApply)) - (timesToApply * 12.99);
    }
}
