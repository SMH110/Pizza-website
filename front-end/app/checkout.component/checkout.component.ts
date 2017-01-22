import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../service/basket.service';
import { BuyerDetailsService } from '../service/buyer-details.service';
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
           margin: 20px 0;
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
    constructor(public basket: BasketService, private router: Router, private guardService: GuardService, public buyerDetailsService: BuyerDetailsService) {

    }
    onSubmit(): void {
        if (this.buyerDetailsService.selectedDeliveryMethod === 'Collection') {
            this.buyerDetailsService.clearAddress()
        }

        this.guardService.canGetPaymentRoute = true;
         this.router.navigate(['./payment']);
    }
    preventDefault(event: Event): void {
        event.preventDefault();
    }
}


