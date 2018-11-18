import { DiscountCalculationDto, DiscountRule } from "./interfaces";
import { flatten, getBasePrices, sortByPrice, sum } from "./helpers";

export const venetianDealExtraLarge: DiscountRule = {
  name: "Venetian Deal - Extra Large",
  description: "Any 2 x Extra Large Pizzas for £19.99",
  calculate(basket: DiscountCalculationDto) {
    return calculate(basket, "Extra Large", 19.99);
  }
};

export const venetianDealLarge: DiscountRule = {
  name: "Venetian Deal - Large",
  description: "Any 2 x Large Pizzas for £17.99",
  calculate(basket: DiscountCalculationDto) {
    return calculate(basket, "Large", 17.99);
  }
};

export const venetianDealMedium: DiscountRule = {
  name: "Venetian Deal - Medium",
  description: "Any 2 x Medium Pizzas for £15.99",
  calculate(basket: DiscountCalculationDto) {
    return calculate(basket, "Medium", 15.99);
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
  let timesToApply = Math.floor(pizzas.length / 2);
  return sum(pizzas.slice(0, timesToApply * 2)) - timesToApply * bundlePrice;
}
