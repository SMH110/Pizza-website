import { DiscountRule } from './interfaces';
import { _extraLargePizzaSideAndCanDeal } from "./extra-large-pizza-deal";
import { _2ExtraLargePizzas } from './2-extra-large-pizzas-deal';
import { _20PercentOff } from './20-percent-off-discount';
import { familyDealExtraLarge, familyDealLarge, familyDealMedium } from './family-deal';
import { godfatherSpecialMealDealLarge, godfatherSpecialMealDealExtraLarge } from './godfathers-special-meal-deal';
import { venetianDealExtraLarge, venetianDealLarge, venetianDealMedium } from './venetian-deal';
import { _largeDeal, _xLargeDeal } from "./july-deals";

export const discounts: DiscountRule[] = [
    _20PercentOff,
    _largeDeal,
    _xLargeDeal,
    _extraLargePizzaSideAndCanDeal,
    _2ExtraLargePizzas,
    godfatherSpecialMealDealExtraLarge,
    godfatherSpecialMealDealLarge,
    familyDealExtraLarge,
    familyDealLarge,
    familyDealMedium,
    venetianDealExtraLarge,
    venetianDealLarge,
    venetianDealMedium
];
