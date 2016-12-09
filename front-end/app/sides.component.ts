import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';
import { saveBasket } from './utils';
@Component({
    moduleId: module.id,
    templateUrl: `./sides.component.html`,
})
export class SidesComponent implements OnInit {
    sides: Side[];
    totalQuantity: number;
    constructor(private ItemService: ItemService, private basket: BasketService) {
        this.totalQuantity = this.basket.totalQuantity
    }

    ngOnInit(): void {
        this.ItemService.getSides()
            .subscribe(sides => this.sides = sides);
    }
    addToBasket(item: any): void {
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
    }
}


interface Side {
    name: string,
    price: number,
    imageName: string
}


