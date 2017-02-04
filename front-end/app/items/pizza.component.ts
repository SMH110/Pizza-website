import { Component, OnInit, ViewChild } from '@angular/core';

import { ItemService } from '../service/items.service';
import { BasketService } from '../service/basket.service';
import { ItemNotificationService } from '../service/item-notification.service';
import { PizzaToppingsModalComponent } from '../pizza-toppings-modal/pizza-toppings-modal.component';

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
    @ViewChild(PizzaToppingsModalComponent)
    modal: PizzaToppingsModalComponent;

    pizzas: PizzaViewModel[];
    jumbotronImage: string = "/images/hero.jpg";
    constructor(private itemService: ItemService, public basket: BasketService, public itemNotification: ItemNotificationService) {
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

    addToBasket(pizza: PizzaViewModel) {
        return this.modal.open({ data: pizza })
            .then(toppings => {
                console.log('toppings selected', toppings);
                this.basket.addToBasket(pizza, pizza.selectedSize);
                this.itemNotification.notify(pizza);
            })
            .catch(error => {
                console.error("An error from the modal", error);
            });
    }
}

export interface PizzaViewModel extends Pizza {
    selectedSize: string;
    sizes: string[];
}
