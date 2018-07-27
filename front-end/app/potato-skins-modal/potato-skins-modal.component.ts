import { Component } from '@angular/core';

import { BaseModalComponent } from '../base-modal.component';
import Toppings from '../../../shared/static-data/toppings';
import calculatePrice from '../../../shared/business-rules/potato-skins-pricing-rule';
import { Topping, Item } from '../../../shared/dtos';

@Component({
    templateUrl: "./potato-skins-modal.component.html",
    styleUrls: [`./potato-skins-modal.component.scss`]
})
export class PotatoSkinsModalComponent extends BaseModalComponent<AddSideModalDto, string[]> {
    availableToppings: Topping[] = Toppings;
    selectedToppings: SelectedTopping[] = [];
    toppingToAdd: Topping = Toppings[0];

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

    getTotalPrice(): number {
        return calculatePrice(Object.assign({ quantity: 1, version: null, options: this.getSelectedOptions() }, this.data.item));
    }

    private getSelectedOptions(): string[] {
        let options = [];
        for (let topping of this.selectedToppings) {
            let amountToAdd = topping.quantity;
            while (amountToAdd-- > 0) {
                options.push(topping.name);
            }
        }
        return options;
    }
}

interface AddSideModalDto {
    item: Item;
}

interface SelectedTopping {
    name: string;
    quantity: number;
}
