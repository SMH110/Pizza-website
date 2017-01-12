import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';

@Component({
    moduleId: module.id,
    templateUrl: `./drinks.component.html`,
})
export class DrinksComponent implements OnInit {
    drinks: Drink[];
     jumbotronImage: string = "/images/drinks-jumbotron.jpg";
    constructor(private itemService: ItemService, private basket: BasketService) {

    }
    ngOnInit(): void {
        this.itemService.getDrinks()
            .subscribe(drinks => this.drinks = drinks);
    }
}


interface Drink {
    name: string,
    price: number,
    imageName: string
}