import { Component } from '@angular/core';

import { BaseModalComponent } from '../base-modal.component';

@Component({
    templateUrl: "./remove-items-modal.component.html"
})
export class RemoveItemsModalComponent extends BaseModalComponent<OrderLineItem, void> {

    removeItem() {
        return this.closeWithResult();
    }
}
