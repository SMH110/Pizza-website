import { DiscountRule } from './interfaces';
import { _extraLargePizza } from "./extra-large-pizza-deal";
import { _2ExtraLargePizzas } from './2-extra-large-pizzas-deal';
import { _20PercentOff } from './20-percent-off-discount';
import { familyDeal1, familyDeal2, familyDeal3 } from './family-deal';
import { freeMediumPizza } from './free-medium-pizza';
import { specialMealDeal1, specialMealDeal2 } from './godfathers-special-meal-deal';
import { venetianDeal1, venetianDeal2, venetianDeal3 } from './venetian-deal';

export const discounts: DiscountRule[] = [
    _extraLargePizza,
    _2ExtraLargePizzas,
    _20PercentOff,
    familyDeal1,
    familyDeal2,
    familyDeal3,
    freeMediumPizza,
    specialMealDeal1,
    specialMealDeal2,
    venetianDeal1,
    venetianDeal2,
    venetianDeal3
];
