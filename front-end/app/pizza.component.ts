import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';
import { saveBasket } from './utils';

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

    pizzas: PizzaItem[];
    totalQuantity: number;
    jumbotronImage: string = "/images/hero.jpg";
    constructor(private itemService: ItemService, private basket: BasketService) {

    }


    ngOnInit(): void {
        this.itemService.getPizzas()
            .subscribe(x => {
                this.pizzas = x;
                this.pizzas.forEach(x => x.selectedSize = 'large');
            });
        this.totalQuantity = this.basket.totalQuantity;
    }

    addToBasket(item: PizzaItem): void {
        // reformating item interface for polymorphism case
        // to look like sides and drinks items in the basket
        let reFormatedItem = {
            name: item.name,
            nameAndSize: `${item.name} | ${item.selectedSize}`,
            _id: item._id,
            size_id: item._id + item.selectedSize,
            size: item.selectedSize,
            price: item.price[item.selectedSize],
            imageName: item.imageName
        }

        let storedItem = this.basket.items[reFormatedItem.size_id]
        if (!storedItem) {
            storedItem = { item: reFormatedItem, qty: 0, price: 0 };
            this.basket.items[reFormatedItem.size_id] = storedItem;
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.basket.totalPrice += storedItem.item.price;
        this.basket.totalQuantity++;
        this.totalQuantity = this.basket.totalQuantity;
        saveBasket(this.basket)
    }


}



interface PizzaItem {
    name: string;
    description: string;
    _id: string;
    price: number[];
    subType: string[];
    imageName: string;
    selectedSize: string;
}