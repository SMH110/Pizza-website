import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../service/basket.service';
import { OrderService } from './../service/order.service';
import { GuardService } from '../service/guard.service';

@Component({
    moduleId: module.id,
    templateUrl: `./payment.component.html`,
    styles: [

        `
        h2{
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
export class PaymentComponent {

    constructor(private basket: BasketService, private orderService: OrderService, private guardService: GuardService, private router: Router) {

    }
    isShowSpinner: boolean = false;

   

    order() {
        this.guardService.canGetPaymentProcessRoute = true;
        localStorage.removeItem('errorMessage');
        localStorage.setItem('canGetPaymentProcessRoute', 'true');
        this.isShowSpinner = true
        this.orderService.placeOrder().subscribe(response => {
            window.location.assign(response.url);
        }, error => {
            localStorage.setItem('errorMessage', JSON.stringify(error.message));
            localStorage.removeItem('canGetPaymentProcessRoute');
            this.router.navigateByUrl('/order/failure');
        });
    }

}

