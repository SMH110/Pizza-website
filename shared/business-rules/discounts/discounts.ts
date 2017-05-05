import { DiscountRule } from './interfaces';
import { _extraLargePizzaDeal1, _extraLargePizzaDeal2 } from "./extra-large-pizza-deal";
import { _2ExtraLargePizzas } from './2-extra-large-pizzas-deal';
import { _20PercentOff } from './20-percent-off-discount';
import { familyDealExtraLarge, familyDealLarge, familyDealMedium } from './family-deal';
import { freeMediumPizza } from './free-medium-pizza';
import { godfatherSpecialMealDealLarge, godfatherSpecialMealDealExtraLarge } from './godfathers-special-meal-deal';
import { venetianDealExtraLarge, venetianDealLarge, venetianDealMedium } from './venetian-deal';

export const discounts: DiscountRule[] = [
    _20PercentOff,
    freeMediumPizza,
    _extraLargePizzaDeal1,
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
