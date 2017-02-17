import calculateBasePrice from './generic-pricing-rule';
import { PizzaToppingPrices } from '../static-data/toppings';

export default function (item: BasketItem) {
    let price = calculateBasePrice(item);
    const toppings = item.options.filter(option => option !== "BBQ base");
    const isWithBBQ_Base: boolean = item.options.indexOf("BBQ base") !== - 1;
    if (item.name === 'Free Choice') {
        price += Math.max(toppings.length - 5, 0) * PizzaToppingPrices[item.version];
        price += isWithBBQ_Base ? 2 : 0;
    } else {
        price += toppings.length * PizzaToppingPrices[item.version];
        price += isWithBBQ_Base ? 2 : 0;
    }
    return price;
}
