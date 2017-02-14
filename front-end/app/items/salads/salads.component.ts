import { Component } from '@angular/core';
import Catalogue from '../../../../shared/static-data/catalogue';

@Component({
    moduleId: module.id,
    templateUrl: `./salads.component.html`,
})
export class SaladsComponent {
    salads: Item[];

    constructor() {
        this.salads = Catalogue.filter(x => x.tags.indexOf('salad') !== -1);
    }
}
