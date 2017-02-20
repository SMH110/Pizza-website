import { Component } from '@angular/core';

import { BasketService } from '../service/basket.service';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private basket: BasketService) {
    }

    getBasketText() {
        let text = 'Basket';
        let itemsInBasket = this.basket.getTotalQuantity();
        if (itemsInBasket > 0)  {
            text += ` (${itemsInBasket} item${itemsInBasket > 1 ? 's' : ''})`;
        } else {
            text += ' (empty)';
        }
        return text;
    }
}
