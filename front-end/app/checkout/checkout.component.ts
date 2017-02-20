import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../service/basket.service';
import { OrderService } from '../service/order.service';
import { ErrorService } from '../service/error.service';
import { validateOrderRequest } from '../../../shared/validation/place-order-request-validator';
import { isDeliveryAddressRequired } from '../../../shared/business-rules/delivery-address-required-rule';
import { isBillingAddressRequired } from '../../../shared/business-rules/billing-address-required-rule';
@Component({
    templateUrl: `./checkout.component.html`,
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

    isShowSpinner: boolean = false;
    deliveryMethods: DeliveryMethod[] = ['Delivery', 'Collection'];
    paymentMethods: PaymentMethod[] = [];

    buyer: Buyer = {} as any;
    deliveryAddress: Address = {} as any;
    deliveryMethod: DeliveryMethod = null;
    paymentMethod: PaymentMethod = null;
    billingAddress: Address = {} as any;
    orderNotes: string;
    billingAddressSameAsDeliveryAddress = false;

    constructor(public basket: BasketService, private router: Router, private orderService: OrderService, private errorService: ErrorService) {
        this.orderService.getAvailablePaymentMethods()
            .subscribe(paymentMethods => this.paymentMethods = paymentMethods);
    }

    order() {
        this.errorService.clearErrors();

        let orderDetail = {
            buyer: this.buyer,
            deliveryAddress: this.deliveryAddress,
            billingAddress: this.billingAddressSameAsDeliveryAddress ? this.deliveryAddress : this.billingAddress,
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

    selectDeliveryMethod(deliveryMethod: DeliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    selectPaymentMethod(paymentMethod: PaymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    isPaymentMethodDisplayed(): boolean {
        return this.deliveryMethod !== null;
    }

    isDisplayPaymentSurchargeMessage(): boolean {
        return this.paymentMethod === 'Credit / Debit Card';
    }

    isAddressDisplayed(): boolean {
        return this.paymentMethod !== null && isDeliveryAddressRequired(this);
    }

    isBillingAddressDisplayed() {
        return isBillingAddressRequired(this);
    }

    getTotalPrice(): number {
        return this.basket.getTotalPayable() + (this.paymentMethod === 'Credit / Debit Card' ? 0.50 : 0)
    }

    getOrderButtonText(): string {
        if (this.paymentMethod === 'Cash' || this.paymentMethod === null) {
            return 'Place order';
        }
        return 'Continue to payment';
    }

    isOrderButtonDisplayed(): boolean {
        return this.deliveryMethod !== null && this.paymentMethod !== null;
    }
}
