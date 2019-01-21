import { DiscountCalculationDto, DiscountRule } from "./interfaces";
import { flatten, getBasePrices, sortByPrice, sum } from "./helpers";

export const familyDealExtraLarge: DiscountRule = {
  name: "Family Deal - Extra Large",
  description: "Any 3 x Extra Large pizzas for £30.99",
  calculate(basket: DiscountCalculationDto) {
    return calculate(basket, "Extra Large", 30.99);
  }
};

export const familyDealLarge: DiscountRule = {
  name: "Family Deal - Large",
  description: "Any 3 x Large pizzas for £26.99",
  calculate(basket: DiscountCalculationDto) {
    return calculate(basket, "Large", 26.99);
  }
};

export const familyDealMedium: DiscountRule = {
  name: "Family Deal - Medium",
  description: "Any 3 x Medium pizzas for £23.99",
  calculate(basket: DiscountCalculationDto) {
    return calculate(basket, "Medium", 23.99);
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
  let timesToApply = Math.floor(pizzas.length / 3);
  return sum(pizzas.slice(0, timesToApply * 3)) - timesToApply * bundlePrice;
}
