import { Component } from '@angular/core';
import Catalogue from '../../../shared/static-data/catalogue';

@Component({
    templateUrl: `./sides.component.html`,
})
export class SidesComponent {
    sides: Item[];

    constructor() {
        this.sides = Catalogue.filter(x => x.tags.indexOf('side') !== -1);
    }
}
