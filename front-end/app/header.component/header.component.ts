import { Component } from '@angular/core';

import { BasketService } from '../service/basket.service';

@Component({
    moduleId: module.id,
    selector: 'my-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    constructor(private basket: BasketService) {
        
    }

    
}

