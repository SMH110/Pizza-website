import genericPricingRule from './generic-pricing-rule';
import pizzaPricingRule from './pizza-pricing-rule';
import potatoSkinsPricingRule from './potato-skins-pricing-rule';

export function getPricingRule(catalogueItem: Item): PricingRule {
    if (catalogueItem.tags.indexOf('pizza') !== -1) {
        return pizzaPricingRule;
    } else if (catalogueItem.name === "Potato Skins with your favourite topping") {
       return potatoSkinsPricingRule;
    }
    return genericPricingRule;
}

type PricingRule = (item: BasketItem) => number;
