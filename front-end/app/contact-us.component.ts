import { Component, OnInit } from '@angular/core';
import { BasketService } from './service/basket.service';
@Component({
    moduleId: module.id,
    templateUrl: `./contact-us.component.html`,
})
export class ContactUsComponent implements OnInit {
    totalQuantity: number;
    constructor(private basket: BasketService) {

    }
    ngOnInit(): void {
        this.totalQuantity = this.basket.totalQuantity;
    }
}
