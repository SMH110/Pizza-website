import { Component } from '@angular/core';

import { BasketService } from '../service/basket.service';
import { ModalService } from '../service/modal.service';
import { ClearBasketModalComponent } from '../clear-basket-modal/clear-basket-modal.component';

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

    async removeItem(item: OrderLineItem) {
        this.basket.removeItem(item);
    }

    async clearBasket() {
        await this.modalService.open(ClearBasketModalComponent);
        this.basket.reset();
    }
}
