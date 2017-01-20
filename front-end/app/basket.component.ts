import { Component } from '@angular/core';

import { BasketService } from './service/basket.service';

@Component({
    moduleId: module.id,
    templateUrl: `./basket.component.html`,
    styles: [`
            img{
                max-height: 60px;
                max-width: 60px;
                display: inline-block
            }

            .next{
                margin-right: 20px;
               padding-left: 35px;
               padding-right: 35px;
            }

            .increase{
                margin-left: 5px;
            }
    `]
})
export class BasketComponent {
    constructor(public basket: BasketService) {
    }
}
