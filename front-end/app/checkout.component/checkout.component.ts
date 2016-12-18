import { Component, OnInit } from '@angular/core';
import { BasketService } from '../service/basket.service';
import { saveFormDetails } from '../utils';
import { Router } from '@angular/router'
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
            margin: 15px 0;
            display:inline-block;
        }

        .total{
            font-size:18px;
            font-weight: bold;
            margin-left: 30px;
        }
        `
    ]
})
export class CheckoutComponent implements OnInit {

    constructor(private basket: BasketService, private router: Router) {

    }

    ngOnInit(): void {
    }

    onSubmit(formValues: any): void {
        saveFormDetails(formValues.value);
        this.router.navigate(['./payment'])
    }
    preventDefault(event: Event): void {
        event.preventDefault();
    }

}

interface CheckoutForm {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    postCode: string;
    email: string;
    phone: string;
    deliveryMethod: string;
}