import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const _2ExtraLargePizzas: DiscountRule = {
    name: 'Any 2 Extra Large pizzas for £18.99',
    description: 'Any 2 x Extra Large pizzas (collection only, or add a side for delivery) for £18.99. Dips are not counted as a side for this discount.',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Extra Large'))));
        let sides = sortByPrice(flatten(basket.items.filter(x => x.tags.indexOf('side') !== -1 && x.name !== 'Dips')));
        let timesToApply = basket.deliveryMethod === 'Collection' ? Math.floor(pizzas.length / 2) : Math.min(Math.floor(pizzas.length / 2), sides.length);
        return sum(pizzas.slice(0, timesToApply * 2)) - (timesToApply * 18.99);
    }
}
