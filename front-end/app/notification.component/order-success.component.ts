import { Component, OnInit } from '@angular/core';


import { BasketService } from '../service/basket.service'
@Component({
    moduleId: module.id,
    templateUrl: `./order-success.component.html`,
    styles: [`
        .center-text{
            text-align: center;
        }
    `]

})
export class OrderSuccessComponent implements OnInit {
    constructor() { }
    ngOnInit() {
    }
}