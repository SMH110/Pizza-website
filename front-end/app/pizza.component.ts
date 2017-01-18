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
    constructor(private itemService: ItemService, public basket: BasketService) {
    }
    
    ngOnInit(): void {
        this.itemService.getPizzas()
            .subscribe(x => {
                this.pizzas = x;
                this.pizzas.forEach(x => x.selectedSize = 'large');
            });
    }
}


interface PizzaViewModel extends Pizza {
    selectedSize?: string;
}
