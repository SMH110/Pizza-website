import { Component } from '@angular/core';
import Catalogue from '../../../../shared/static-data/catalogue';
import { Item } from '../../../../shared/dtos';

@Component({
    templateUrl: `./calzone.component.html`,
})
export class CalzoneComponent {
    calzones: Item[];

    constructor() {
        this.calzones = Catalogue.filter(x => x.tags.indexOf('calzone') !== -1);
    }
}
