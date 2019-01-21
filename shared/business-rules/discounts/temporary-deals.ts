import { DiscountCalculationDto, DiscountRule } from "./interfaces";
import { flatten, getBasePrices, sortByPrice, sum } from "./helpers";

export const anyPizza_9_99: DiscountRule = {
  name: "Any pizza any size for £9.99 - Collection only",
  description: "Any pizza any size for £9.99. Collection only.",
  calculate(basket: DiscountCalculationDto) {
    if (basket.deliveryMethod !== "Collection") {
      return 0;
    }

    let pizzas = sortByPrice(
      flatten(
        getBasePrices(basket.items.filter(x => x.tags.indexOf("pizza") !== -1))
      )
    );
    let timesToApply = pizzas.length;
    return sum(pizzas.slice(0, timesToApply)) - timesToApply * 9.99;
  }
};

export const anyXLPizza_12_99: DiscountRule = {
  name: "Any XL pizza for £12.99",
  description: "Any XL pizza for £12.99",
  calculate(basket: DiscountCalculationDto) {
    let pizzas = sortByPrice(
      flatten(
        getBasePrices(
          basket.items.filter(
            x => x.version === "Extra Large" && x.tags.indexOf("pizza") !== -1
          )
        )
      )
    );
    let timesToApply = pizzas.length;
    return sum(pizzas.slice(0, timesToApply)) - timesToApply * 12.99;
  }
};
