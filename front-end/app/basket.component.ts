import { Component, OnInit } from '@angular/core';

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
    `]
})
export class BasketComponent implements OnInit {
    items: any[] = [];
    constructor(private basket: BasketService) {

    }
    ngOnInit(): void {
        this.items = this.basket.generateArray();
    }

    buttonState(quantity: number): boolean {
        return quantity < 2
    }

    removeItem(item: any): void {
        this.basket.removeItem(item);
    }

    removeAll(): void {
        this.basket.removeAll();
        console.log();
    }
}
