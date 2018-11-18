import { DiscountCalculationDto, DiscountRule } from "./interfaces";
import { flatten, getBasePrices, sortByPrice, sum } from "./helpers";

export const godfatherSpecialMealDealLarge: DiscountRule = {
  name: "Godfather's Special Meal Deal - Large",
  description:
    "2 Large pizzas, 1 x Spicy Wings (8 pieces) or BBQ Wings, 1 x Garlic Bread and 1 x Bottle of Soft Drink for £25.99",
  calculate(basket: DiscountCalculationDto) {
    return calculate(basket, "Large", 25.99);
  }
};

export const godfatherSpecialMealDealExtraLarge: DiscountRule = {
  name: "Godfather's Special Meal Deal - Extra Large",
  description:
    "2 Extra Large pizzas, 1 x Spicy Wings (8 pieces) or BBQ Wings, 1 x Garlic Bread and 1 x Bottle of Soft Drink for £28.99",
  calculate(basket: DiscountCalculationDto) {
    return calculate(basket, "Extra Large", 28.99);
  }
};

function calculate(
  basket: DiscountCalculationDto,
  pizzaSize: string,
  bundlePrice: number
) {
  let pizzas = sortByPrice(
    flatten(
      getBasePrices(
        basket.items.filter(
          x => x.tags.indexOf("pizza") !== -1 && x.version === pizzaSize
        )
      )
    )
  );
  let wings = sortByPrice(
    flatten(
      basket.items.filter(
        x => x.name === "Spicy Chicken Wings" || x.name === "BBQ Wings"
      )
    )
  );
  let garlicBread = sortByPrice(
    flatten(basket.items.filter(x => x.name === "Garlic Bread"))
  );
  let drinks = sortByPrice(
    flatten(basket.items.filter(x => x.tags.indexOf("bottle") !== -1))
  );

  let timesToApply = Math.min(
    Math.floor(pizzas.length / 2),
    Math.floor(wings.length),
    Math.floor(garlicBread.length),
    Math.floor(drinks.length)
  );
  return (
    sum(pizzas.slice(0, timesToApply * 2)) +
    sum(wings.slice(0, timesToApply)) +
    sum(garlicBread.slice(0, timesToApply)) +
    sum(drinks.slice(0, timesToApply)) -
    timesToApply * bundlePrice
  );
}
