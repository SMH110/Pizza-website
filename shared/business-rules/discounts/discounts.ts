import { DiscountRule } from './interfaces';
import { _extraLargePizzaDeal2 } from "./extra-large-pizza-deal";
import { _2ExtraLargePizzas } from './2-extra-large-pizzas-deal';
import { _20PercentOff } from './20-percent-off-discount';
import { familyDealExtraLarge, familyDealLarge, familyDealMedium } from './family-deal';
import { godfatherSpecialMealDealLarge, godfatherSpecialMealDealExtraLarge } from './godfathers-special-meal-deal';
import { venetianDealExtraLarge, venetianDealLarge, venetianDealMedium } from './venetian-deal';
import { _xLargeDeal, _largeDeal } from "./may-deal";
import { _xLargeWeekendDeal } from "./weekend-deal";

export const discounts: DiscountRule[] = [
    _20PercentOff,
    _largeDeal,
    _xLargeDeal,
    _xLargeWeekendDeal,
    _extraLargePizzaDeal2,
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
