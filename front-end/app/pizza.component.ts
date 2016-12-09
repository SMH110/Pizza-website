import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';

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
    totalQuantity: number;
    constructor(private itemService: ItemService, private basket: BasketService) {

    }
    ngOnInit(): void {
        this.itemService.getPizzas()
            .subscribe(pizzas => this.pizzas = pizzas);
        this.totalQuantity = this.basket.totalQuantity;
    }

}


interface PizzaItem {
    name: string,
    description: string,
    price: number[],
    subType: string[],
    imageName: string
}