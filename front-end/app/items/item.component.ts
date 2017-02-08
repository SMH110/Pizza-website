import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { BasketService } from '../service/basket.service';
import { NotificationService } from '../service/notification.service';
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

    @ViewChild(AddPizzaModalComponent)
    addPizzaModal: AddPizzaModalComponent;

    versions?: string[];
    selectedVersion: string = null;

    constructor(private basket: BasketService, private itemNotificationService: NotificationService) {
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
            return this.addPizzaModal.open({ data: { item: this.item, version: this.selectedVersion } });
        } else {
            return [];
        }
    }
}
