import { Component } from '@angular/core';

import { BaseModalComponent } from '../base-modal.component';
import Toppings, { PizzaToppingPrices } from '../../../shared/static-data/toppings';
import calculatePrice from '../../../shared/business-rules/pizza-pricing-rule';

@Component({
    templateUrl: `./add-pizza-modal.component.html`,
    styleUrls: [`./add-pizza-modal.component.css`]
})
export class AddPizzaModalComponent extends BaseModalComponent<AddPizzaModalDto, string[]> {
    selectedOptions: string[] = [];
    toppings: Topping[] = Toppings;
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
        return PizzaToppingPrices[this.data.version];
    }

    getTotalPrice(): number {
        return calculatePrice(Object.assign({ quantity: 1, version: this.data.version, options: this.selectedOptions }, this.data.item));
    }

    isFreeChoice(): boolean {
        return this.data.item.name === 'Free Choice';
    }
}

interface AddPizzaModalDto {
    item: Item;
    version: string;
}
