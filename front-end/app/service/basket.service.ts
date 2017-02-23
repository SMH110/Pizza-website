import { Injectable } from '@angular/core';
import { BasketService as SharedBasketService } from '../../../shared/services/basket-service';

const STORAGE_KEY = 'basket';

@Injectable()
export class BasketService extends SharedBasketService {
    constructor() {
        super();
        this.loadItems();
    }
    orderNotes: string

    addToBasket(item: BasketItem): void {
        this.loadItems();
        super.addToBasket(item);
        this.saveItems();
    }

    increase(item: OrderLineItem) {
        this.loadItems();
        super.increase(item);
        this.saveItems();
    }

    decrease(item: OrderLineItem) {
        this.loadItems();
        super.decrease(item);
        this.saveItems();
    }

    removeItem(item: OrderLineItem): void {
        this.loadItems();
        super.removeItem(item);
        this.saveItems();
    }

    removeAll(): void {
        this.loadItems();
        super.removeAll();
        this.saveItems();
    }

    selectDeliveryMethod(deliveryMethod: DeliveryMethod) {
        this.loadItems();
        super.selectDeliveryMethod(deliveryMethod);
        this.saveItems();
    }

    selectPaymentMethod(paymentMethod: PaymentMethod) {
        this.loadItems();
        super.selectPaymentMethod(paymentMethod);
        this.saveItems();
    }

    private loadItems(): void {
        let basket = JSON.parse(localStorage.getItem(STORAGE_KEY) || null);
        const HOUR = 60 * 60 * 1000;
        if (basket !== null) {
            if (Date.now() - basket.date <= 6 * HOUR) {
                this.items = basket.items;
                this.deliveryMethod = basket.deliveryMethod;
                this.paymentMethod = basket.paymentMethod;
                this.orderNotes = basket.orderNotes;
            }
        }
    }
    clearOrderNotes() {
        let basket = JSON.parse(localStorage.getItem(STORAGE_KEY) || null);
        if (basket !== null) {
            this.orderNotes = null;
        }
        this.saveItems();
    }

     saveItems(): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            items: this.items,
            deliveryMethod: this.deliveryMethod,
            paymentMethod: this.paymentMethod,
            orderNotes: this.orderNotes,
            date: Date.now()
        }));
    }
}
