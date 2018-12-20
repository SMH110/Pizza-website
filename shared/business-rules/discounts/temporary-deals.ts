import { DiscountCalculationDto, DiscountRule } from "./interfaces";
import { flatten, getBasePrices, sortByPrice, sum } from "./helpers";

export const _anyPizza_9_99: DiscountRule = {
  name: "Any pizza any size for £9.99",
  description: "Any pizza any size for £9.99",
  calculate(basket: DiscountCalculationDto) {
    const now = Date.now();
    if (
      now > new Date(2019, 0, 1, 9, 0, 0).getTime() &&
      now < new Date(2019, 0, 2, 9, 0, 0).getTime()
    ) {
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
