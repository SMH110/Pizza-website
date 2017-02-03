import { Component } from '@angular/core';

import { PizzaViewModel } from '../items/pizza.component';
import { BaseModalComponent } from '../base-modal.component';

@Component({
    moduleId: module.id,
    selector: 'pizza-toppings-modal',
    templateUrl: `./pizza-toppings-modal.component.html`
})
export class PizzaToppingsModalComponent extends BaseModalComponent<PizzaViewModel, string[]> {
    addToBasketWithToppings() {
        return this.closeWithResult(['Cheese', 'Mushrooms']);
    }
    addToBasketWithoutToppings() {
        return this.closeWithResult([]);
    }
    someErrorHappened() {
        return this.closeWithError(new Error('OOPS, Some error happened'));
    }
}
