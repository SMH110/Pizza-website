import { Component, OnInit } from '@angular/core';

import { ItemService } from '../service/items.service';
import { BasketService } from '../service/basket.service';
import { ItemNotificationService } from '../service/item-notification.service';

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

.form-control{
    width:50%;
    display: inline-block;
    margin-right:10px;
}
`]
})
export class PizzaComponent implements OnInit {
    pizzas: PizzaViewModel[];
    jumbotronImage: string = "/images/hero.jpg";
    constructor(private itemService: ItemService, public basket: BasketService, public itemNotification: ItemNotificationService ) {
    }

    ngOnInit(): void {
        this.itemService.getPizzas()
            .subscribe(pizzas => {
                this.pizzas = pizzas.map(pizza => {
                    let sizes = Object.keys(pizza.price);
                    return Object.assign({
                        sizes,
                        selectedSize: sizes[0]
                    }, pizza);
                });
            });
    }
}


interface PizzaViewModel extends Pizza {
    selectedSize: string;
    sizes: string[];
}
