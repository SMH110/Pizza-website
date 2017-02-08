import { Component } from '@angular/core';

import { BaseModalComponent } from '../base-modal.component';
import Toppings, { PizzaToppingPrices } from '../../../shared/static-data/toppings';

@Component({
    moduleId: module.id,
    selector: 'add-pizza-modal',
    templateUrl: `./add-pizza-modal.component.html`,
    styleUrls: [`./add-pizza-modal.component.css`]
})
export class AddPizzaModalComponent extends BaseModalComponent<AddPizzaModalDto, string[]> {
    selectedOptions: string[] = [];
    toppings: Topping[] = Toppings;
    toppingPrices = PizzaToppingPrices;
    selectedTopping: Topping = Toppings[0];

    addTopping() {
        this.selectedOptions.push(this.selectedTopping.name);
    }

    addToBasketWithToppings() {
        return this.closeWithResult(this.selectedOptions);
    }

    addToBasketWithoutToppings() {
        return this.closeWithResult([]);
    }

    removeOption(option: string) {
        this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
    }

    getIndividualToppingPrice(): number {
        return this.toppingPrices[this.data.version];
    }

    getTotalPrice(): number {
        let pizzaPrice = this.data.item.price[this.data.version];
        let optionsPrice = this.selectedOptions.length * this.getIndividualToppingPrice();
        return pizzaPrice + optionsPrice;
    }
}

interface AddPizzaModalDto {
    item: Item;
    version: string;
}
