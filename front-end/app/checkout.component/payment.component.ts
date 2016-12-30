import { Component, OnInit } from '@angular/core';

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
export class PaymentComponent implements OnInit {

    constructor(private basket: BasketService, private orderService: OrderService, private guardService: GuardService) {

    }
    isShowSpinner: boolean = false;
    ngOnInit(): void {
    }

    order() {
        this.guardService.canGetPaymentProcessRoute = true;
        localStorage.removeItem('errorMessage');
        localStorage.setItem('canGetPaymentProcessRoute', 'true');
        this.isShowSpinner = true
        this.orderService.postOrder().subscribe(response => {
            if (response.approval_url) {
                window.location.assign(response.approval_url);
            } else {
                localStorage.setItem('errorMessage', JSON.stringify(response.message));
                localStorage.removeItem('canGetPaymentProcessRoute');
                window.location.assign(response.error);
            }

        });

    }

}

