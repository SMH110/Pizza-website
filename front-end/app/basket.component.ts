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
        this.totalQuantity = this.basket.totalQuantity
    }
    ngOnInit(): void {
        this.items = this.basket.generateArray();
        this.totalPrice = this.basket.totalPrice;
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
        this.totalQuantity = this.basket.totalQuantity
        saveBasket(this.basket)


        console.log(this.basket);
        console.log("------------> items   ", JSON.stringify(this.basket.items, null, 2));
    }
}