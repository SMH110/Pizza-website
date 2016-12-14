import { Component, OnInit } from '@angular/core';
import { BasketService } from './service/basket.service';
@Component({
    moduleId: module.id,
    templateUrl: `./terms-and-conditions.component.html`,
})
export class TermsAndConditionsComponent implements OnInit {
    totalQuantity: number;
    constructor(private basket: BasketService) {

    }
    ngOnInit(): void {
        this.totalQuantity = this.basket.totalQuantity;
    }
}
