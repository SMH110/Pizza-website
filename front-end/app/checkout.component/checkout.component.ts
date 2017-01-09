import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { saveFormDetails, saveInputValue } from '../utils';
import { BasketService } from '../service/basket.service';
import { GuardService } from '../service/guard.service';

@Component({
    moduleId: module.id,
    templateUrl: `./checkout.component.html`,
    styles: [
        `
        .form-control{
            width: 85%;
            display:inline-block;
            margin-bottom: 10px;
        }
        .delivery-method{
            margin-right: 50px;
        }
        button{
            margin: 12px 0;
            display:inline-block;
        }

        .total{
            font-size:18px;
            font-weight: bold;
            margin-left: 30px;
        }

        .error-msg{
             width: 85%;
        }

        .asterisk{
            color: red
        }
        .note{
            color: #888;
            font-style: italic;
            margin-bottom : 0;
        }
        `
    ]
})
export class CheckoutComponent {

    // set default value from the form's inputs 
    firstName: string = this.initializeInputWithDefaultValue("firstName");
    lName: string = this.initializeInputWithDefaultValue("lastName");
    address1: string = this.initializeInputWithDefaultValue("address1");
    address2: string = this.initializeInputWithDefaultValue("address2");
    pc: string = this.initializeInputWithDefaultValue("postCode");
    email_: string = this.initializeInputWithDefaultValue("email");
    phone_: string = this.initializeInputWithDefaultValue("phone");

    defaultDeliveryMethod: string = this.initializeInputWithDefaultValue("deliveryMethod") || 'delivery';
    deliveryMethods: string[] = [
        'delivery', 'collection'
    ]
    constructor(private basket: BasketService, private router: Router, private guardService: GuardService) {

    }

    onSubmit(form: NgForm): void {
        this.guardService.canGetPaymentRoute = true;
        saveFormDetails(form.value);
        this.router.navigate(['./payment']);
    }
    preventDefault(event: Event): void {
        event.preventDefault();
    }

    // get the customer detail from localStorage if it's available otherwise return empty string ""
    private initializeInputWithDefaultValue(value: string) {
        const storedDetails = JSON.parse(localStorage.getItem('checkout-details'));
        return storedDetails ? storedDetails[value] : "";
    }

    onBlurMethod(value: any) {
        // get the customer details from the local storage if they are already there
        let storedInput = JSON.parse(localStorage.getItem('checkout-details'));

        // if there is no stored details in the local storge set storedInput to empty object
        if (!storedInput) {
            storedInput = {};
        }
        // delete the stored input for replacing
        if ( storedInput && storedInput[value.name]) {
            delete storedInput[value.name];
        }
        storedInput[value.name] = value.model;
        saveInputValue(storedInput)
    }
}

