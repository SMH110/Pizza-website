import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const godfatherSpecialMealDealLarge: DiscountRule = {
    name: "Godfather's Special Meal Deal - Large",
    description: '1 Large pizza, 1 x Spicy Wings (8 pieces) or BBQ Wings, and 1 x Bottle of Soft Drink for £13.99',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Large', 13.99);
    }
}

export const godfatherSpecialMealDealExtraLarge: DiscountRule = {
    name: "Godfather's Special Meal Deal - Extra Large",
    description: '1 Extra Large pizza, 1 x Spicy Wings (8 pieces) or BBQ Wings, and 1 x Bottle of Soft Drink for £16.99',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Extra Large', 16.99);
    }
}

function calculate(basket: DiscountCalculationDto, pizzaSize: string, bundlePrice: number) {
    let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === pizzaSize))));
    let spicyWings = sortByPrice(flatten(basket.items.filter(x => x.name === "Spicy Chicken Wings" || x.name === "BBQ Wings")));
    let drinks = sortByPrice(flatten(basket.items.filter(x => x.tags.indexOf('bottle') !== -1)));

    let timesToApply = Math.min(Math.floor(pizzas.length), Math.floor(spicyWings.length), Math.floor(drinks.length));
    return sum(pizzas.slice(0, timesToApply)) + sum(spicyWings.slice(0, timesToApply)) + sum(drinks.slice(0, timesToApply)) - (timesToApply * bundlePrice);
}
