import { Component } from '@angular/core';

import { BaseModalComponent } from '../base-modal.component';
import Toppings, { PizzaToppingPrices } from '../../../shared/static-data/toppings';
import calculatePrice from '../../../shared/business-rules/pizza-pricing-rule';

@Component({
    templateUrl: `./add-pizza-modal.component.html`,
    styleUrls: [`./add-pizza-modal.component.scss`]
})
export class AddPizzaModalComponent extends BaseModalComponent<AddPizzaModalDto, string[]> {
    availableToppings: Topping[] = Toppings;
    selectedToppings: SelectedTopping[] = [];
    toppingToAdd: Topping = Toppings[0];
    isBBQBaseSelected = false;

    addSelectedTopping() {
        let existingTopping = this.selectedToppings.find(x => x.name === this.toppingToAdd.name);
        if (existingTopping !== undefined) {
            existingTopping.quantity++;
        } else {
            this.selectedToppings.push({
                name: this.toppingToAdd.name,
                quantity: 1
            });
        }
    }

    increaseQuantity(selectedTopping: SelectedTopping) {
        selectedTopping.quantity++;
    }

    decreaseQuantity(selectedTopping: SelectedTopping) {
        selectedTopping.quantity--;
    }

    removeTopping(selectedTopping: SelectedTopping) {
        this.selectedToppings.splice(this.selectedToppings.indexOf(selectedTopping), 1);
    }

    addToBasket() {
        return this.closeWithResult(this.getSelectedOptions());
    }

    getIndividualToppingPrice(): number {
        return PizzaToppingPrices[this.data.version];
    }

    getTotalPrice(): number {
        return calculatePrice(Object.assign({ quantity: 1, version: this.data.version, options: this.getSelectedOptions() }, this.data.item));
    }

    isFreeChoice(): boolean {
        return this.data.item.name === 'Free Choice';
    }

    isShowBaseOptions() {
        return this.data.item.name !== "BBQ Pizza";
    }

    getBaseName() {
        return this.data.item.name === 'Garlic Meat Lover' ? 'Garlic sauce' : 'Tomato sauce';
    }

    private getSelectedOptions(): string[] {
        let options = [];
        if (this.isBBQBaseSelected) {
            options.push('BBQ base');
        }
        for (let topping of this.selectedToppings) {
            let amountToAdd = topping.quantity;
            while (amountToAdd-- > 0) {
                options.push(topping.name);
            }
        }
        return options;
    }
}

interface AddPizzaModalDto {
    item: Item;
    version: string;
}

interface SelectedTopping {
    name: string;
    quantity: number;
}
