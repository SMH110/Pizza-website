import { Component, Input, OnInit } from '@angular/core';

import { BasketService } from '../service/basket.service';
import { NotificationService } from '../service/notification.service';

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
    selectedVersion?: string;

    constructor(private basket: BasketService, private itemNotificationService: NotificationService) {
    }

    ngOnInit() {
        if (typeof this.item.price === 'object') {
            this.versions = Object.keys(this.item.price);
            this.selectedVersion = this.versions[0];
        }
    }

    addToBasket() {
        this.basket.addToBasket(this.item, this.selectedVersion);
        this.itemNotificationService.itemAdded.emit(this.item);
    }
}
