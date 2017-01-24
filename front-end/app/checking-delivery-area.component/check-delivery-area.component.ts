import { Component } from '@angular/core';
import { isPostcodeValid } from '../../../shared/validation/delivery-area-validator'
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
    showErrorMessage: boolean = false;
    showSuccessMessage: boolean = false;
    constructor() {

    }

    validPostcode() {
        this.showErrorMessage = !isPostcodeValid(this.postcode);
        this.showSuccessMessage = isPostcodeValid(this.postcode);

    }
}



