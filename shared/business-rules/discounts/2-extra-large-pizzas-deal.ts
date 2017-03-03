import { DiscountCalculationDto } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

// TODO: Can this be applied multiple times?
export const _2ExtraLargePizzas = {
    name: 'Any 2 Extra Large pizzas for £18.99 (collection only, or add a side for delivery)',
    calculate(basket: DiscountCalculationDto) {
        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Extra Large'))));
        let sides = sortByPrice(flatten(basket.items.filter(x => x.tags.indexOf('side') !== -1 && x.name !== 'Dips')));
        // The discount is displayed on the basket screen before the delivery method has been selected.
        // This will be shown for all orders where there are 2 Extra Large pizzas, regardless of whether there are any sides.
        // This would probably act as an "upsell" message to those who want their order delivered and haven't added a side.
        // However, if they continue with delivery without selecting a side then the discount won't actually be applied and
        // this will be reflected in their total order cost in the checkout.
        let timesToApply = basket.deliveryMethod !== 'Delivery' ? Math.floor(pizzas.length / 2) : Math.min(Math.floor(pizzas.length / 2), sides.length);
        return sum(pizzas.slice(0, timesToApply * 2)) - (timesToApply * 18.99);
    }
}
