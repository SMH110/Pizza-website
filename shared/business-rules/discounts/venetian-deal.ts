import { DiscountCalculationDto } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const venetianDeal1 = {
    name: 'Extra Large Venetian Deal',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Extra Large', 'bottle', 1, 22.99);
    }
}

export const venetianDeal2 = {
    name: 'Large Venetian Deal',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Large', 'can', 2, 19.99);
    }
}

export const venetianDeal3 = {
    name: 'Medium Venetian Deal',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Medium', 'can', 2, 17.99);
    }
}

function calculate(basket: DiscountCalculationDto, pizzaSize: string, drinkTag: Tag, numberOfDrinks: number, bundlePrice: number) {
    let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === pizzaSize))));
    let drinks = sortByPrice(flatten(basket.items.filter(x => x.tags.indexOf(drinkTag) !== -1)));
    let timesToApply = Math.min(Math.floor(pizzas.length / 2), Math.floor(drinks.length * numberOfDrinks));
    return sum(pizzas.slice(0, timesToApply * 2)) + sum(drinks.slice(0, timesToApply * numberOfDrinks)) - (timesToApply * bundlePrice);
}
