import { Component, OnInit } from '@angular/core';

import { BasketService } from './service/basket.service';
import { saveBasket } from './utils';

@Component({
    moduleId: module.id,
    templateUrl: `./basket.component.html`,
    styles: [`
            img{
                max-height: 150px;
            }
    `]
})
export class BasketComponent implements OnInit {
    totalQuantity: number;
    totalPrice: number
    items: any[] = [];
    constructor(private basket: BasketService) {

    }
    ngOnInit(): void {
        this.items = this.basket.generateArray();
        this.totalPrice = Math.round(this.basket.totalPrice * 100) / 100;
        this.totalQuantity = this.basket.totalQuantity
    }

    buttonState(quantity: number): boolean {
        return quantity < 2
    }
    increaseItem(item: any): void {
        let storedItem = this.basket.items[item._id]
        if (!storedItem) {
            storedItem = { item: item, qty: 0, price: 0 };
            this.basket.items[item._id] = storedItem;
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.basket.totalPrice += storedItem.item.price;
        this.basket.totalQuantity++;
        this.totalQuantity = this.basket.totalQuantity;
        this.totalPrice = Math.round(this.basket.totalPrice * 100) / 100;
        saveBasket(this.basket);
    }

    decreaseItem(item: any) {
        let storedItem = this.basket.items[item._id]
        if (!storedItem) return;
        storedItem.qty--;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.basket.totalPrice -= storedItem.item.price;
        this.basket.totalQuantity--;
        this.totalQuantity = this.basket.totalQuantity;
        this.totalPrice = Math.round(this.basket.totalPrice * 100) / 100;
        saveBasket(this.basket);
    }

}