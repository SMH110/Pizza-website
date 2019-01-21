import { DiscountRule } from "./interfaces";
import { _2ExtraLargePizzas } from "./2-extra-large-pizzas-deal-nov-18";
import { _20PercentOff } from "./20-percent-off-discount";
import {
  familyDealExtraLarge,
  familyDealLarge,
  familyDealMedium
} from "./family-deal";
import {
  godfatherSpecialMealDealLarge,
  godfatherSpecialMealDealExtraLarge
} from "./godfathers-special-meal-deal-nov-18";
import {
  venetianDealExtraLarge,
  venetianDealLarge,
  venetianDealMedium
} from "./venetian-deal";
import { anyPizza_9_99, anyXLPizza_12_99 } from "./temporary-deals";

export const discounts: DiscountRule[] = [
  _20PercentOff,
  anyPizza_9_99,
  anyXLPizza_12_99,
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
