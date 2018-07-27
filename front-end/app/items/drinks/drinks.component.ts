import { Component } from '@angular/core';
import Catalogue from '../../../../shared/static-data/catalogue';
import { Item } from '../../../../shared/dtos';

@Component({
    templateUrl: `./drinks.component.html`,
})
export class DrinksComponent {
    drinks: Item[];

    constructor() {
        this.drinks = Catalogue.filter(x => x.tags.indexOf('drink') !== -1);
    }
}
