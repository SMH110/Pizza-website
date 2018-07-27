import { Component } from "@angular/core";
import { isPostcodeWithinDeliveryArea } from "../../../shared/validation/delivery-area-validator";
@Component({
  templateUrl: `./check-delivery-area.component.html`,
  styleUrls: ["./check-delivery-area.component.scss"]
})
export class CheckDeliveryAreaComponent {
  postcode: string = "";
  isValidationResultShown: boolean = false;
  validationResult: string;
  isValid: boolean = false;

  validPostcode(): void {
    let result: boolean = isPostcodeWithinDeliveryArea(this.postcode);
    if (this.postcode.replace(/\s/g, "").length > 7) {
      this.isValid = false;
      this.validationResult = "Invalid UK postcode";
    } else if (result === false) {
      this.isValid = false;
      this.validationResult =
        "We don't deliver to your area. However, you can still place an order for collection.";
    } else {
      this.isValid = true;
      this.validationResult = "We can deliver to your area";
    }
    this.isValidationResultShown = true;
  }
}
