import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
export class PaymentComponent {

    isShowSpinner: boolean = false;

    constructor(public basket: BasketService, private orderService: OrderService, private router: Router) {
    }

    order() {
        localStorage.removeItem('errorMessage');
        this.isShowSpinner = true

        const buyerDetails: any = JSON.parse(localStorage.getItem('checkout-details'));
        
        let orderDetail = {
            buyer: {
                firstName: buyerDetails.firstName,
                lastName: buyerDetails.lastName,
                address: buyerDetails.address2 && buyerDetails.address2.length ? `${buyerDetails.address1} ${buyerDetails.address2}` : buyerDetails.address1,
                postCode: buyerDetails.postCode,
                email: buyerDetails.email,
                phone: buyerDetails.phone
            },
            orderItems: this.basket.items,
            deliveryMethod: buyerDetails.deliveryMethod,
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
