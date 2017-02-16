import { Component } from '@angular/core';
import Catalogue from '../../../../shared/static-data/catalogue';

@Component({
    templateUrl: `./pasta.component.html`,
})
export class PastaComponent {
    pastas: Item[];

    constructor() {
        this.pastas = Catalogue.filter(x => x.tags.indexOf('pasta') !== -1);
    }
}
