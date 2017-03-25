import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const _extraLargePizza: DiscountRule = {
    name: 'Any Extra Large pizza for £12.99',
    price: 12.99,
    description: 'Any Extra Large pizza for £12.99 (collection only, or add a side for delivery)',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Extra Large'))));
        let sides = sortByPrice(flatten(basket.items.filter(x => x.tags.indexOf('side') !== -1 && x.name !== 'Dips')));
        let timesToApply = basket.deliveryMethod === 'Collection' ? Math.floor(pizzas.length) : Math.min(Math.floor(pizzas.length), sides.length);
        return sum(pizzas.slice(0, timesToApply)) - (timesToApply * 12.99);
    }
}
