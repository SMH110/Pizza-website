import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';

@Component({
    moduleId: module.id,
    selector: 'my-pizza',
    templateUrl: `./pizza.component.html`,
    styles: [`
   .thumbnail img {
    max-height: 160px;
}
select {
    margin-bottom: 15px;
}
`]
})
export class PizzaComponent implements OnInit {
    pizzas: PizzaItem[];
    selectedSize: string = "large";
    constructor(private itemService: ItemService) {

    }
    ngOnInit(): void {
        this.itemService.getPizzas()
            .subscribe(pizzas => this.pizzas = pizzas);
    }
}


interface PizzaItem {
    name: string,
    description: string,
    price: number[],
    subType: string[],
    imageName: string
}