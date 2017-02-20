import { Component } from '@angular/core';

import { BaseModalComponent } from '../base-modal.component';
import Toppings from '../../../shared/static-data/toppings';
import calculatePrice from '../../../shared/business-rules/potato-skins-pricing-rule';

@Component({
    templateUrl: "potato-skins-modal.component.html"
})
export class PotatoSkinsModalComponent extends BaseModalComponent<AddSideModalDto, string[]> {
    selectedOptions: string[] = [];
    toppings: Topping[] = Toppings;
    selectedTopping: Topping = Toppings[0];

    addToBasketWithToppings() {
        return this.closeWithResult(this.selectedOptions)
    }

    removeOption(option: string) {
        this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
    }

    addTopping() {
        this.selectedOptions.push(this.selectedTopping.name);
    }

    getTotalPrice(): number {
        return calculatePrice(Object.assign({ quantity: 1, version: null, options: this.selectedOptions }, this.data.item));
    }
}
interface AddSideModalDto {
    item: Item;
}
