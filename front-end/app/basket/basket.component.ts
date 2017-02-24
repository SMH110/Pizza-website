import { Component } from '@angular/core';

import { BasketService } from '../service/basket.service';
import { ModalService } from '../service/modal.service';
import { RemoveItemsModalComponent } from '../remove-items-modal/remove-items-modal.component';
@Component({
    templateUrl: `./basket.component.html`,
    styleUrls: [`./basket.component.scss`]
})
export class BasketComponent {
    constructor(public basket: BasketService, private modalService: ModalService) {
    }

    getDescription(item: BasketItem) {
        return BasketService.getDescription(item);
    }

    async  removeItems(item?: OrderLineItem) {
        await this.modalService.open(RemoveItemsModalComponent, { data: item });
        this.basket.removeItem(item);
    }

    async clearBasket() {
        await this.modalService.open(RemoveItemsModalComponent);
        this.basket.reset();
    }
}
