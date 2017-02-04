import { Component } from '@angular/core';
import { ItemService } from '../service/items.service';

@Component({
    moduleId: module.id,
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

    constructor(private itemService: ItemService) {
        this.itemService.getPizzas()
            .subscribe(pizzas => {
                this.pizzas = pizzas;
            });
    }
}
