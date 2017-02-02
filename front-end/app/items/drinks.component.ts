import { Component, OnInit } from '@angular/core';

import { ItemService } from '../service/items.service';
import { BasketService } from '../service/basket.service';
import { ItemNotificationService } from '../service/item-notification.service';

@Component({
    moduleId: module.id,
    templateUrl: `./drinks.component.html`,
})
export class DrinksComponent implements OnInit {
    drinks: Drink[];
    jumbotronImage: string = "/images/drinks-jumbotron.jpg";

    constructor(private itemService: ItemService, public basket: BasketService, public itemNotification: ItemNotificationService) {
    }

    ngOnInit(): void {
        this.itemService.getDrinks()
            .subscribe(drinks => this.drinks = drinks);
    }
}