import genericPricingRule from './generic-pricing-rule';
import pizzaPricingRule from './pizza-pricing-rule';

export function getPricingRule(catalogueItem: Item): PricingRule {
    if (catalogueItem.tags.indexOf('pizza') !== -1) {
        return pizzaPricingRule;
    }
    return genericPricingRule;
}

type PricingRule = (item: BasketItem) => number;
