import { Component } from '@angular/core';
import { BasketService } from '../service/basket.service';

@Component({
    templateUrl: `./order-success.component.html`,
    styles: [`
        .center-text{
            text-align: center;
        }
    `]

})
export class OrderSuccessComponent {
    constructor(private basketService: BasketService) {
        this.basketService.removeAll();
    }
}
