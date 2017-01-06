import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { saveFormDetails } from '../utils';
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
            margin: 15px 0;
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
        `
    ]
})
export class CheckoutComponent implements OnInit {
    defaultDeliveryMethod: string = 'delivery';
    deliveryMethods: string[] = [
        'delivery', 'collection'
    ]
    constructor(private basket: BasketService, private router: Router, private guardService: GuardService) {

    }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm): void {
        this.guardService.canGetPaymentRoute = true;
        saveFormDetails(form.value);
        this.router.navigate(['./payment']);
    }
    preventDefault(event: Event): void {
        event.preventDefault();
    }

}

