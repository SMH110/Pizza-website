import { Component } from "@angular/core";
import { discounts } from "../../../shared/business-rules/discounts/discounts";

@Component({
  templateUrl: `./special-offers.component.html`,
  styleUrls: [`./special-offers.component.scss`]
})
export class SpecialOffersComponent {
  public discounts = discounts.filter(x => x.discountCode === undefined);
}
