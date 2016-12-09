import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';
import { saveBasket } from './utils';

@Component({
    moduleId: module.id,
    templateUrl: `./drinks.component.html`,
})
export class DrinksComponent implements OnInit {
    drinks: Drink[];
    totalQuantity: number;
    constructor(private itemService: ItemService, private basket: BasketService) {

    }
    ngOnInit(): void {
        this.itemService.getDrinks()
            .subscribe(drinks => this.drinks = drinks);
            this.totalQuantity = this.basket.totalQuantity;
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
        this.totalQuantity = this.basket.totalQuantity;
        saveBasket(this.basket)
    }
}


interface Drink {
    name: string,
    price: number,
    imageName: string
}