import calculateBasePrice from './generic-pricing-rule';
import { BasketItem } from '../dtos';

export default function (item: BasketItem){
    let price = calculateBasePrice(item);
     price += Math.max(item.options.length - 1, 0) * 0.90;
     return price;
}
