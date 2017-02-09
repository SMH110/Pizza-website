import { Component, Input, OnInit } from '@angular/core';

import { BasketService } from '../service/basket.service';
import { NotificationService } from '../service/notification.service';
import { ModalService } from '../service/modal.service';
import { AddPizzaModalComponent } from '../add-pizza-modal/add-pizza-modal.component';

@Component({
    moduleId: module.id,
    selector: 'item',
    templateUrl: `./item.component.html`,
    styles: [`
    `]
})
export class ItemComponent implements OnInit {
    @Input()
    item: Item;

    versions?: string[];
    selectedVersion: string = null;

    constructor(private basket: BasketService, private itemNotificationService: NotificationService, private modalService: ModalService) {
    }

    ngOnInit() {
        if (typeof this.item.price === 'object') {
            this.versions = Object.keys(this.item.price);
            this.selectedVersion = this.versions[0];
        }
    }

    async addToBasket() {
        let options = await this.getOptions();
        this.basket.addToBasket(Object.assign({ version: this.selectedVersion, quantity: 1, options }, this.item));
        this.itemNotificationService.itemAdded.emit(this.item);
    }

    private async getOptions() {
        if (this.item.tags.indexOf('pizza') !== -1) {
            return this.modalService.open(AddPizzaModalComponent, { data: { item: this.item, version: this.selectedVersion } });
        } else {
            return [];
        }
    }
}
