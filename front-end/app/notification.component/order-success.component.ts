import { Component, OnInit } from '@angular/core';

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
    ngOnInit(): void {
       
    }
}