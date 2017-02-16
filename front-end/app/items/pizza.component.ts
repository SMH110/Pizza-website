import { Component } from '@angular/core';
import Catalogue from '../../../shared/static-data/catalogue';

@Component({
    templateUrl: `./pizza.component.html`,
    styles: [`
   .thumbnail img {
    max-height: 160px;
}
select {
    margin-bottom: 15px;
}

.form-control{
    width:50%;
    display: inline-block;
    margin-right:10px;
}
`]
})
export class PizzaComponent {
    pizzas: Item[];

    constructor() {
        this.pizzas = Catalogue.filter(x => x.tags.indexOf('pizza') !== -1);
    }
}
