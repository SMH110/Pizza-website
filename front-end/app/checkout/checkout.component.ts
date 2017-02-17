import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../service/basket.service';
import { OrderService } from '../service/order.service';
import { ErrorService } from '../service/error.service';
import { validateOrderRequest } from '../../../shared/validation/place-order-request-validator';
import { isPostcodeWithinDeliveryArea } from '../../../shared/validation/delivery-area-validator';
@Component({
    templateUrl: `./checkout.component.html`,
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

    isShowSpinner: boolean = false;
    deliveryMethods: DeliveryMethod[] = ['Delivery', 'Collection'];
    paymentMethods: PaymentMethod[] = [];

    buyer: Buyer = {} as any;
    deliveryAddress: Address = {} as any;
    deliveryMethod: DeliveryMethod = 'Delivery';
    paymentMethod: PaymentMethod = 'Cash';
    billingAddress: Address = {} as any;
    orderNotes: string;

    constructor(public basket: BasketService, private router: Router, private orderService: OrderService, private errorService: ErrorService) {
        this.orderService.getAvailablePaymentMethods()
            .subscribe(paymentMethods => this.paymentMethods = paymentMethods);
    }

    order() {
        this.errorService.clearErrors();

        let orderDetail = {
            buyer: this.buyer,
            deliveryAddress: this.deliveryAddress,
            billingAddress: this.billingAddress,
            orderItems: this.basket.items,
            deliveryMethod: this.deliveryMethod,
            paymentMethod: this.paymentMethod,
            note: this.orderNotes,
            date: new Date()
        };

        let validationErrors = validateOrderRequest(orderDetail, this.paymentMethods);
        if (validationErrors.length > 0) {
            this.errorService.displayErrors(validationErrors);
            return;
        }
        this.isShowSpinner = true
        this.orderService.placeOrder(orderDetail).subscribe(response => {
            this.basket.removeAll();
            if (response.isFullPageRedirect) {
                window.location.assign(response.url);
            } else {
                this.router.navigateByUrl(`${response.url}`);
            }
        }, error => {
            if (error.status === 400) {
                this.isShowSpinner = false;
                let validationErrors = error.json();
                this.errorService.displayErrors(validationErrors);
            } else {
                this.router.navigateByUrl('/order/failure');
            }
        });
    }

    checkPostcode(): void {
        this.errorService.clearErrors();

        if (this.deliveryMethod === "Collection" && this.paymentMethod === "Cash") {
            if (isPostcodeWithinDeliveryArea(this.deliveryAddress.postcode) === false) {
                this.errorService.displayErrors(["We were unable to verify your address. If you still want to place an cash on collection order please call us."]);
            }
        } else if (this.deliveryMethod === "Delivery") {
            if (isPostcodeWithinDeliveryArea(this.deliveryAddress.postcode) === false) {
                this.errorService.displayErrors(["We don't deliver to your area. However, you can still place an order for collection."]);
            }
        }



    }

    isBillingAddressRequired() {
        return ['MasterCard', 'JCB', 'Maestro', 'VISA'].indexOf(this.paymentMethod) !== -1;
    }

    isAddressRequired(): boolean {
        return this.deliveryMethod === "Delivery" || (this.deliveryMethod === "Collection" && this.paymentMethod === "Cash");
    }


}
