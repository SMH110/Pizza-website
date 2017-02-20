import { Injectable } from '@angular/core';
import { BasketService as SharedBasketService } from '../../../shared/services/basket-service';

const STORAGE_KEY = 'basket';

@Injectable()
export class BasketService extends SharedBasketService {
    constructor() {
        super();
        this.loadItems();
    }

    addToBasket(item: BasketItem): void {
        super.addToBasket(item);
        this.saveItems();
    }

    increase(item: OrderLineItem) {
        super.increase(item);
        this.saveItems();
    }

    decrease(item: OrderLineItem) {
        super.decrease(item);
        this.saveItems();
    }

    removeItem(item: OrderLineItem): void {
        super.removeItem(item);
        this.saveItems();
    }

    removeAll(): void {
        super.removeAll();
        this.saveItems();
    }

    private loadItems(): void {
        let basket = JSON.parse(localStorage.getItem(STORAGE_KEY) || null);
        const HOUR = 60 * 60 * 1000;
        if (basket !== null) {
            if (Date.now() - basket.date <= 6 * HOUR) {
                this.items = basket.items;
            }
        }
    }

    private saveItems(): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            items: this.items,
            date: Date.now()
        }));
    }
}
