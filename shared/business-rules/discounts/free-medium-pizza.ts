import { DiscountCalculationDto } from './interfaces';
import { flatten, getBasePrices, sortByPrice } from './helpers';

// TODO: Can this be applied multiple times?
export const freeMediumPizza = {
    name: 'Free medium pizza on orders over £30',
    calculate(basket: DiscountCalculationDto) {
        if (basket.totalPrice < 30) {
            return 0;
        }

        let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === 'Medium'))));
        return pizzas.length > 0 ? pizzas[0].price : 0;
    }
}
