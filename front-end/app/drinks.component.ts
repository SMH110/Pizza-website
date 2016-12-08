import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';

@Component({
    moduleId: module.id,
      templateUrl: `./drinks.component.html`,
})
export class DrinksComponent implements OnInit {
    drinks: Drink[];
    constructor(private itemService: ItemService) {

    }
    ngOnInit(): void {
        this.itemService.getDrinks()
            .subscribe(drinks => this.drinks = drinks)
    }
}


interface Drink {
    name: string,
    price: number,
    imageName: string
}