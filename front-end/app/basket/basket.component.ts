import { Component } from '@angular/core';

import { BasketService } from '../service/basket.service';

@Component({
    templateUrl: `./basket.component.html`,
    styleUrls: [`./basket.component.scss`]
})
export class BasketComponent {
    constructor(public basket: BasketService) {
    }

    getDescription(item: BasketItem) {
        return BasketService.getDescription(item);
    }
}
