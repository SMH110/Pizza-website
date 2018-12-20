import { Component } from "@angular/core";

import { BasketService } from "../service/basket.service";
import { ModalService } from "../service/modal.service";
import { ClearBasketModalComponent } from "../clear-basket-modal/clear-basket-modal.component";
import { ErrorService } from "../service/error.service";
import { NotificationService } from "../service/notification.service";
import { OrderLineItem } from "../../../shared/domain-entities";

@Component({
  templateUrl: `./basket.component.html`,
  styleUrls: [`./basket.component.scss`]
})
export class BasketComponent {
  discountCode: string = this.basket.discountCode || "";
  voucherCode: string = this.basket.voucherCode || "";

  constructor(
    public basket: BasketService,
    private modalService: ModalService,
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) {
    this.initialise();
  }

  async initialise() {
    if (this.basket.voucherCode !== null && this.basket.voucher === null) {
      try {
        await this.basket.setVoucherCode(this.voucherCode.trim() || null);
      } catch (e) {
        this.voucherCode = "";
      }
    }
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

  removeItem(item: OrderLineItem) {
    this.basket.removeItem(item);
    this.removeDiscountIfNoLongerValid();
  }

  async clearBasket() {
    await this.modalService.open(ClearBasketModalComponent);
    this.basket.reset();
  }

  applyCode(): void {
    this.errorService.clearErrors();
    this.basket.discountCode = this.discountCode.trim() || null;
    if (this.basket.discountCode !== null) {
      if (this.basket.getDiscount() === null) {
        this.errorService.displayErrors([
          "The discount code you have entered is not valid for your order."
        ]);
        this.basket.discountCode = null;
      } else {
        this.notificationService.discountSuccessfullyApplied.emit();
      }
    }
  }

  clearCode(): void {
    this.discountCode = "";
    this.basket.discountCode = null;
  }

  isValidCodeApplied(): boolean {
    return (
      this.basket.discountCode !== null && this.basket.getDiscount() !== null
    );
  }

  private removeDiscountIfNoLongerValid(): void {
    if (
      this.basket.discountCode !== null &&
      this.basket.getDiscount() === null
    ) {
      this.basket.discountCode = null;
      this.discountCode = "";
    }
  }

  async applyVoucher() {
    this.errorService.clearErrors();
    try {
      await this.basket.setVoucherCode(this.voucherCode.trim() || null);
      this.notificationService.voucherSuccessfullyApplied.emit();
    } catch (e) {
      this.errorService.displayErrors([e.message]);
    }
  }

  async clearVoucher() {
    this.voucherCode = "";
    await this.basket.setVoucherCode(null);
  }

  isValidVoucherApplied(): boolean {
    return this.basket.voucher !== null;
  }
}
