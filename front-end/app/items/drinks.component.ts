import { Component } from '@angular/core';
import { ItemService } from '../service/items.service';

@Component({
    moduleId: module.id,
    templateUrl: `./drinks.component.html`,
})
export class DrinksComponent {
    drinks: Item[];

    constructor(private itemService: ItemService) {
        this.itemService.getDrinks()
            .subscribe(drinks => this.drinks = drinks);
    }
}
