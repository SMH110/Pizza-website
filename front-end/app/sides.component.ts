import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';
import { ItemNotificationService } from './service/item-notification.service';

@Component({
    moduleId: module.id,
    templateUrl: `./sides.component.html`,
})
export class SidesComponent implements OnInit {
    sides: Side[];
    jumbotronImage: string = "/images/side-jumbotron.jpg";

    constructor(private ItemService: ItemService, public basket: BasketService, public itemNotification: ItemNotificationService) {
    }

    ngOnInit(): void {
        this.ItemService.getSides()
            .subscribe(sides => this.sides = sides);
    }
}
