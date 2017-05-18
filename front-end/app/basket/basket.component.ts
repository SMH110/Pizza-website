import { Component } from '@angular/core';

import { BasketService } from '../service/basket.service';
import { ModalService } from '../service/modal.service';
import { ClearBasketModalComponent } from '../clear-basket-modal/clear-basket-modal.component';
import { ErrorService } from "../service/error.service";
import { NotificationService } from "../service/notification.service";

@Component({
    templateUrl: `./basket.component.html`,
    styleUrls: [`./basket.component.scss`]
})
export class BasketComponent {
    discountCode: string = this.basket.discountCode || '';

    constructor(public basket: BasketService,
        private modalService: ModalService,
        private errorService: ErrorService,
        private notificationService: NotificationService) {
    }

    getDescription(item: OrderLineItem) {
        return BasketService.getDescription(item);
    }

    increase(item: OrderLineItem) {
        this.basket.increase(item);
        this.removeDiscountIfNoLongerValid();
    }

    decrease(item: OrderLineItem) {
        this.basket.decrease(item);
        this.removeDiscountIfNoLongerValid();
    }

    async removeItem(item: OrderLineItem) {
        this.basket.removeItem(item);
        this.removeDiscountIfNoLongerValid();
    }

    async clearBasket() {
        await this.modalService.open(ClearBasketModalComponent);
        this.basket.reset();
    }

    applyCode(): void {
        this.errorService.clearErrors();
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim
        this.basket.discountCode = this.discountCode.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') || null;
        if (this.basket.discountCode !== null) {
            if (this.basket.getDiscount() === null) {
                this.errorService.displayErrors(["The discount code you have entered is not valid for your order."]);
                this.basket.discountCode = null;
            } else {
                this.notificationService.discountSuccessfullyApplied.emit();
            }
        }
    }

    clearCode(): void {
        this.discountCode = '';
        this.basket.discountCode = null;
    }

    isValidCodeApplied(): boolean {
        return this.basket.discountCode !== null && this.basket.getDiscount() !== null;
    }

    private removeDiscountIfNoLongerValid(): void {
        if (this.basket.discountCode !== null && this.basket.getDiscount() === null) {
            this.basket.discountCode = null;
            this.discountCode = '';
        }
    }
}
