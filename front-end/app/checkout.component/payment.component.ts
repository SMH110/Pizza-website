import { Component, OnInit } from '@angular/core';
import { BasketService } from '../service/basket.service';

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
   
    constructor(private basket: BasketService) {

    }

    ngOnInit(): void {
    }


}

