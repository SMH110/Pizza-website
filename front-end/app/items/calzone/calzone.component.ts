import { Component } from '@angular/core';
import Catalogue from '../../../../shared/static-data/catalogue';

@Component({
    moduleId: module.id,
    templateUrl: `./calzone.component.html`,
})
export class CalzoneComponent {
    calzones: Item[];

    constructor() {
        this.calzones = Catalogue.filter(x => x.tags.indexOf('calzone') !== -1);
    }
}
