import calculateBasePrice from './generic-pricing-rule';
import { PizzaToppingPrices } from '../static-data/toppings';
import { pizzaBases } from '../static-data/pizza-bases';

export default function (item: BasketItem) {
    let price = calculateBasePrice(item);
    const toppings = item.options.filter(option => pizzaBases.find(x => x.name === option) === undefined);
    if (item.name === 'Free Choice') {
        price += Math.max(toppings.length - 5, 0) * PizzaToppingPrices[item.version];
    } else {
        price += toppings.length * PizzaToppingPrices[item.version];
    }
    const bases = item.options.filter(option => pizzaBases.find(x => x.name === option) !== undefined);
    if (bases.length > 0) {
        price += 2;
    }
    return price;
}
