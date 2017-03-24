import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const familyDeal1: DiscountRule = {
    name: 'Family Deal - Extra Large',
    price: 34.99,
    description: 'Any 3 x Extra Large pizzas and a Portion of Cheesy Chips or Bottle of Drink or Garlic Bread for £34.99',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Extra Large', 34.99);
    }
}

export const familyDeal2: DiscountRule = {
    name: 'Family Deal - Large',
    price: 29.99,
    description: 'Any 3 x Large pizzas and a Portion of Cheesy Chips or Bottle of Drink or Garlic Bread for £29.99',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Large', 29.99);
    }
}

export const familyDeal3: DiscountRule = {
    name: 'Family Deal - Medium',
    price: 25.99,
    description: 'Any 3 x Medium pizzas and a Portion of Cheesy Chips or Bottle of Drink or Garlic Bread for £25.99',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Medium', 25.99);
    }
}

function calculate(basket: DiscountCalculationDto, pizzaSize: string, bundlePrice: number) {
    let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === pizzaSize))));
    let additionalItem = sortByPrice(flatten(basket.items.filter(x =>
        (["Cheesy chips", "Garlic Bread"].indexOf(x.name) !== -1) ||
        x.tags.indexOf('bottle') !== -1
    )));
    let timesToApply = Math.min(Math.floor(pizzas.length / 3), Math.floor(additionalItem.length));
    return sum(pizzas.slice(0, timesToApply * 3)) + sum(additionalItem.slice(0, timesToApply)) - (timesToApply * bundlePrice);
}
