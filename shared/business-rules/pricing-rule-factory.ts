import genericPricingRule from "./generic-pricing-rule";
import pizzaPricingRule from "./pizza-pricing-rule";
import potatoSkinsPricingRule from "./potato-skins-pricing-rule";
import { Item, BasketItem } from "../dtos";

export function getPricingRule(catalogueItem: Item): PricingRule {
  if (catalogueItem.tags.indexOf("pizza") !== -1) {
    return pizzaPricingRule;
  } else if (catalogueItem.name === "Potato Skins") {
    return potatoSkinsPricingRule;
  }
  return genericPricingRule;
}

type PricingRule = (item: BasketItem) => number;
