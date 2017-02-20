import calculateBasePrice from './generic-pricing-rule';

export default function (item: BasketItem){
    let price = calculateBasePrice(item);
     price += Math.max(item.options.length - 1, 0) * 0.90;
     return price;
}
