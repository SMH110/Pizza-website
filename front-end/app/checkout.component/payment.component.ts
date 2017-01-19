import { Component } from '@angular/core';
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

    isShowSpinner: boolean = false;

    constructor(public basket: BasketService, private orderService: OrderService, private guardService: GuardService, private router: Router) {
    }

    order() {
        this.guardService.canGetPaymentProcessRoute = true;
        localStorage.removeItem('errorMessage');
        localStorage.setItem('canGetPaymentProcessRoute', 'true');
        this.isShowSpinner = true

        const buyerDetails: any = JSON.parse(localStorage.getItem('checkout-details'));
        let items: any[] = [];
        let storedItems: any = JSON.parse(localStorage.getItem('items'));

        for (let id in storedItems) {
            items.push({
                item: storedItems[id].item,
                qty: storedItems[id].qty,
                price: Math.round(storedItems[id].price * 100) / 100
            });
        }

        let orderDetail = {
            buyer: {
                firstName: buyerDetails.firstName,
                lastName: buyerDetails.lastName,
                address: buyerDetails.address2 && buyerDetails.address2.length ? `${buyerDetails.address1} ${buyerDetails.address2}` : buyerDetails.address1,
                postCode: buyerDetails.postCode,
                email: buyerDetails.email,
                phone: buyerDetails.phone
            },
            orderItems: items,
            deliveryMethod: buyerDetails.deliveryMethod,
            date: new Date(),
            paymentMethod: 'paypal',
            total: Math.round(JSON.parse(localStorage.getItem('totalPrice')) * 100) / 100,
            discount: 0,
            totalPayment: Math.round(JSON.parse(localStorage.getItem('totalPrice')) * 100) / 100
        };

        this.orderService.placeOrder(orderDetail).subscribe(response => {
            this.basket.removeAll();
            window.location.assign(response.url);
        }, error => {
            localStorage.setItem('errorMessage', JSON.stringify(error.message));
            localStorage.removeItem('canGetPaymentProcessRoute');
            this.router.navigateByUrl('/order/failure');
        });
    }
}
