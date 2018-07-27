import calculateBasePrice from "./generic-pricing-rule";
import { PizzaToppingPrices } from "../static-data/toppings";
import { BasketItem } from "../dtos";

export default function(item: BasketItem) {
  let price = calculateBasePrice(item);
  const toppings = item.options.filter(option => option !== "BBQ base");
  if (item.name === "Free Choice") {
    price +=
      Math.max(toppings.length - 5, 0) * PizzaToppingPrices[item.version];
  } else {
    price += toppings.length * PizzaToppingPrices[item.version];
  }
  if (item.options.indexOf("BBQ base") !== -1) {
    price += 1;
  }
  return price;
}
