import { Component } from '@angular/core';

import { BasketService } from '../service/basket.service';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent  {
    constructor(public basket: BasketService) {
    }
}
