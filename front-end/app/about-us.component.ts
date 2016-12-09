import { Component, OnInit } from '@angular/core';
import { BasketService } from './service/basket.service';
@Component({
    moduleId: module.id,
    selector: 'my-pizza',
    templateUrl: `./about-us.component.html`,
})
export class AboutUsComponent implements OnInit {
    totalQuantity: number;
    constructor(private basket: BasketService) {

    }
    ngOnInit(): void {
        this.totalQuantity = this.basket.totalQuantity;
    }
}
