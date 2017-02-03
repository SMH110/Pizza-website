import { Component } from '@angular/core';
import { isPostcodeWithinDeliveryArea } from '../../../shared/validation/delivery-area-validator'
@Component({
    moduleId: module.id,
    templateUrl: `./check-delivery-area.component.html`,
    styles: [
        `h2 {
            margin-bottom: 20px;
        }
        input{
            width: 110px;;
        }

        h4{
            margin-top: 20px;
        }
        `
    ]

})
export class CheckDeliveryAreaComponent {
    postcode: string = '';
    isValidationResultShown: boolean = false;
    validationResult: string;
    isValid: boolean = false;

    validPostcode(): void {
        let result: boolean = isPostcodeWithinDeliveryArea(this.postcode);
        if (result && this.postcode.replace(/\s/g, "").length < 8) {
            this.isValid = true;
            this.validationResult = "We can deliver to your area";
        } else if (result && this.postcode.replace(/\s/g, "").length > 7) {
            this.validationResult = "Invalid UK postcode";
        } else {
            this.validationResult = "We don't deliver to your area. However, you can still place an order for collection."
        }
        this.isValidationResultShown = true;
    }
}



