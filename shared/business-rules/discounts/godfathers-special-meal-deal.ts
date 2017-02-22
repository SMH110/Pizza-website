import { DiscountCalculationDto } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const specialMealDeal1 = {
    name: "Godfather's Special Meal Deal Large",
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Large', 27.99);
    }
}

export const specialMealDeal2 = {
    name: "Godfather's Special Meal Deal Extra Large",
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Extra Large', 29.99);
    }
}

function calculate(basket: DiscountCalculationDto, pizzaSize: string, bundlePrice: number) {
    let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === pizzaSize))));
    let spicyWings = sortByPrice(flatten(basket.items.filter(x => x.name === "Spicy Chicken Wings")));
    // Should this be all types of Garlic Bread or just the plain type? Also the cost differences between them?
    let garlicBread = sortByPrice(flatten(basket.items.filter(x => x.name === "Garlic Bread")));
    let drinks = sortByPrice(flatten(basket.items.filter(x => x.name === "Bottle of Drink")));

    let timesToApply = Math.min(Math.floor(pizzas.length / 2), Math.floor(spicyWings.length), Math.floor(garlicBread.length), Math.floor(drinks.length));
    return sum(pizzas.slice(0, timesToApply * 2)) + sum(spicyWings.slice(0, timesToApply)) + sum(garlicBread.slice(0, timesToApply)) + sum(drinks.slice(0, timesToApply)) - (timesToApply * bundlePrice);
}
