import { Component, Input, OnInit } from '@angular/core';

import { BasketService } from '../../service/basket.service';
import { NotificationService } from '../../service/notification.service';
import { ModalService } from '../../service/modal.service';
import { AddPizzaModalComponent } from '../../add-pizza-modal/add-pizza-modal.component';
import { PotatoSkinsModalComponent } from '../../potato-skins-modal/potato-skins-modal.component';
import { Item } from '../../../../shared/dtos';

@Component({
    selector: 'item',
    templateUrl: `./item.component.html`,
    styleUrls: [`./item.component.scss`]
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
        } else if (this.item.name === "Potato Skins") {
            return this.modalService.open(PotatoSkinsModalComponent, { data: { item: this.item } });
        } else {
            return [];
        }
    }

    getPrice(): number {
        if (typeof this.item.price === 'object') {
            return this.item.price[this.selectedVersion];
        }
        return this.item.price;
    }
}
