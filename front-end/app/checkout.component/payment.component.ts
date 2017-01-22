import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../service/basket.service';
import { OrderService } from './../service/order.service';
import { BuyerDetailsService } from '../service/buyer-details.service';
import { ErrorService } from '../service/error.service';
import { validateOrderRequest } from '../../../shared/validation/place-order-request-validator';

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

    isShowSpinner: boolean = false;

    constructor(public basket: BasketService, private orderService: OrderService, private router: Router, private errorService: ErrorService, private buyerDetailsService: BuyerDetailsService) {
    }

    order() {
        this.errorService.clearErrors();

        let orderDetail = {
            buyer: {
                firstName: this.buyerDetailsService.firstName,
                lastName: this.buyerDetailsService.lastName,
                email: this.buyerDetailsService.email,
                phone: this.buyerDetailsService.phone,
            },
            deliveryAddress: {
                line1: this.buyerDetailsService.addressLine1,
                line2: this.buyerDetailsService.addressLine2,
                town: this.buyerDetailsService.town,
                postcode: this.buyerDetailsService.postcode,
            },
            orderItems: this.basket.items,
            note: this.buyerDetailsService.note,
            deliveryMethod: this.buyerDetailsService.selectedDeliveryMethod,
            paymentMethod: 'paypal',
        };

        let validationErrors = validateOrderRequest(orderDetail, ['paypal']);
        if (validationErrors.length > 0) {
            this.errorService.displayErrors(validationErrors);
            return;
        }

        this.isShowSpinner = true
        this.orderService.placeOrder(orderDetail).subscribe(response => {
            this.basket.removeAll();
            window.location.assign(response.url);
        }, error => {
            if (error.status === 400) {
                error.json().then((validationErrors: string[]) => {
                    this.isShowSpinner = false;
                    this.errorService.displayErrors(validationErrors);
                });
            } else {
                this.router.navigateByUrl('/order/failure');
            }
        });
    }
}