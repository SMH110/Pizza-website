import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../service/basket.service';
import { OrderService } from '../service/order.service';
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

    constructor(public basket: BasketService, private orderService: OrderService, private router: Router, private errorService: ErrorService) {
    }

    order() {
        this.errorService.clearErrors();
        this.isShowSpinner = true

        const buyerDetails: any = JSON.parse(localStorage.getItem('checkout-details'));

        let orderDetail = {
            buyer: {
                firstName: buyerDetails.firstName,
                lastName: buyerDetails.lastName,
                email: buyerDetails.email,
                phone: buyerDetails.phone
            },
            deliveryAddress: {
                line1: buyerDetails.address1,
                line2: buyerDetails.address2,
                town: null,
                postcode: buyerDetails.postCode
            },
            orderItems: this.basket.items,
            deliveryMethod: buyerDetails.deliveryMethod,
            paymentMethod: 'paypal',
        } as PlaceOrderRequest;

        let validationErrors = validateOrderRequest(orderDetail, ['paypal']);
        if (validationErrors.length > 0) {
            this.errorService.displayErrors(validationErrors);
            return;
        }

        this.orderService.placeOrder(orderDetail).subscribe(response => {
            this.basket.removeAll();
            window.location.assign(response.url);
        }, error => {
            if (error.status === 400) {
                error.json().then((validationErrors: string[]) => {
                    this.errorService.displayErrors(validationErrors);
                });
            } else {
                this.router.navigateByUrl('/order/failure');
            }
        });
    }
}
