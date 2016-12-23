import { Component, OnInit } from '@angular/core';
import { BasketService } from '../service/basket.service';
import { OrderService } from './../service/order.service';

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

    constructor(private basket: BasketService, private orderService: OrderService) {

    }

    ngOnInit(): void {
    }

    order() {
        this.orderService.postOrder().subscribe(response => {
            localStorage.setItem('execute-url', response.execute_url);
            localStorage.setItem('access-token', response.access_token)
            window.location.assign(response.approval_url || response.error);
        });

    }

}

