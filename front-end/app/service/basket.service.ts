import { Injectable } from "@angular/core";
import { BasketService as SharedBasketService } from "../../../shared/services/basket-service";
import { Http } from "@angular/http";
import {
  DeliveryMethod,
  PaymentMethod,
  BasketItem
} from "../../../shared/dtos";
import { Voucher, OrderLineItem } from "../../../shared/domain-entities";

const STORAGE_KEY = "basket";

@Injectable()
export class BasketService extends SharedBasketService {
  private hasBaseConstructorRun = true;

  constructor(private http: Http) {
    super();
    this.load();
  }

  private _orderNotes: string = null;
  private _deliveryMethod: DeliveryMethod = null;
  private _paymentMethod: PaymentMethod = null;
  private _discountCode: string = null;
  private _voucherCode: string = null;

  async getVoucher(code: string) {
    try {
      return await this.http
        .get(`/api/voucher/${code}`)
        .toPromise()
        .then(x => x.json() as Voucher);
    } catch (e) {
      throw new Error(this.voucherInvalidMessage);
    }
  }

  get orderNotes() {
    return this._orderNotes;
  }

  set orderNotes(orderNotes: string) {
    this.load();
    this._orderNotes = orderNotes;
    this.save();
  }

  get discountCode() {
    return this._discountCode;
  }

  set discountCode(discountCode: string) {
    this.load();
    this._discountCode = discountCode;
    this.save();
  }

  get voucherCode() {
    return this._voucherCode;
  }

  set voucherCode(voucherCode: string) {
    this.load();
    this._voucherCode = voucherCode;
    this.save();
  }

  async setVoucherCode(voucherCode: string) {
    this.load();
    await super.setVoucherCode(voucherCode);
    this.save();
  }

  get deliveryMethod() {
    return this._deliveryMethod;
  }

  set deliveryMethod(deliveryMethod: DeliveryMethod) {
    this.load();
    this._deliveryMethod = deliveryMethod;
    this.save();
  }

  get paymentMethod() {
    return this._paymentMethod;
  }

  set paymentMethod(paymentMethod: PaymentMethod) {
    this.load();
    this._paymentMethod = paymentMethod;
    this.save();
  }

  addToBasket(item: BasketItem): void {
    this.load();
    super.addToBasket(item);
    this.save();
  }

  increase(item: OrderLineItem) {
    item.quantity++;
    this.save();
  }

  decrease(item: OrderLineItem) {
    item.quantity--;
    this.save();
  }

  removeItem(item: OrderLineItem): void {
    this.items.splice(this.items.indexOf(item), 1);
    this.save();
  }

  reset(): void {
    this.items = [];
    this._deliveryMethod = null;
    this._paymentMethod = null;
    this._orderNotes = null;
    this._discountCode = null;
    this._voucherCode = null;
    this.voucher = null;
    this.save();
  }

  private load(): void {
    if (this.hasBaseConstructorRun !== true) {
      return;
    }

    let basket = JSON.parse(localStorage.getItem(STORAGE_KEY) || null);
    const HOUR = 60 * 60 * 1000;
    if (basket !== null) {
      if (Date.now() - basket.date <= 6 * HOUR) {
        this.items = basket.items;
        this._deliveryMethod = basket.deliveryMethod;
        this._paymentMethod = basket.paymentMethod;
        this._orderNotes = basket.orderNotes;
        this._discountCode = basket.discountCode;
        this._voucherCode = basket.voucherCode;
      }
    }
  }

  private save(): void {
    if (this.hasBaseConstructorRun !== true) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        items: this.items,
        deliveryMethod: this.deliveryMethod,
        paymentMethod: this.paymentMethod,
        orderNotes: this.orderNotes,
        discountCode: this.discountCode,
        voucherCode: this.voucherCode,
        date: Date.now()
      })
    );
  }
}
