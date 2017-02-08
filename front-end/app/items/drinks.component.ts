import { Component } from '@angular/core';
import Catalogue from '../../../shared/static-data/catalogue';

@Component({
    moduleId: module.id,
    templateUrl: `./drinks.component.html`,
})
export class DrinksComponent {
    drinks: Item[];

    constructor() {
        this.drinks = Catalogue.filter(x => x.tags.indexOf('drink') !== -1);
    }
}
