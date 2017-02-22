import { DiscountCalculationDto } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const familyDeal1 = {
    name: 'Extra Large Family Deal',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Extra Large', 34.99);
    }
}

export const familyDeal2 = {
    name: 'Large Family Deal',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Large', 29.99);
    }
}

export const familyDeal3 = {
    name: 'Medium Family Deal',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Medium', 25.99);
    }
}

function calculate(basket: DiscountCalculationDto, pizzaSize: string, bundlePrice: number) {
    let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === pizzaSize))));
    // Should this be all types of Garlic Bread or just the plain type? Also the cost differences between them?
    let additionalItem = sortByPrice(flatten(basket.items.filter(x => ["Cheesy chips", "Bottle of Drink", "Garlic Bread"].indexOf(x.name) !== -1)));
    let timesToApply = Math.min(Math.floor(pizzas.length / 3), Math.floor(additionalItem.length));
    return sum(pizzas.slice(0, timesToApply * 3)) + sum(additionalItem.slice(0, timesToApply)) - (timesToApply * bundlePrice);
}
