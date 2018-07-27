import { Component } from '@angular/core';
import Catalogue from '../../../../shared/static-data/catalogue';
import { Item } from '../../../../shared/dtos';

@Component({
    templateUrl: `./salads.component.html`,
})
export class SaladsComponent {
    salads: Item[];

    constructor() {
        this.salads = Catalogue.filter(x => x.tags.indexOf('salad') !== -1);
    }
}
