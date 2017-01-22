import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../service/basket.service';
import { OrderService } from './../service/order.service';
import { BuyerDetailsService } from '../service/buyer-details.service';

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

    constructor(public basket: BasketService, private orderService: OrderService, private router: Router, private buyerDetailsService: BuyerDetailsService) {
    }

    order() {
        localStorage.removeItem('errorMessage');
        this.isShowSpinner = true
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
                town: null,
                postcode: this.buyerDetailsService.postcode,
            },
            orderItems: this.basket.items,
            note: this.buyerDetailsService.note,
            deliveryMethod: this.buyerDetailsService.selectedDeliveryMethod,
            paymentMethod: 'paypal',
        } as PlaceOrderRequest;

        this.orderService.placeOrder(orderDetail).subscribe(response => {
            this.basket.removeAll();
            window.location.assign(response.url);
        }, error => {
            localStorage.setItem('errorMessage', JSON.stringify(error.message));
            this.router.navigateByUrl('/order/failure');
        });
    }
}