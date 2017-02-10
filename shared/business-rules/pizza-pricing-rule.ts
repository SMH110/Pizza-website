import calculateBasePrice from './generic-pricing-rule';
import { PizzaToppingPrices } from '../static-data/toppings';

export default function (item: BasketItem) {
    let price = calculateBasePrice(item);
    if (item.name === 'Free Choice') {
        price += Math.max(item.options.length - 5, 0) * PizzaToppingPrices[item.version];
    } else {
        price += item.options.length * PizzaToppingPrices[item.version];
    }
    return price;
}
