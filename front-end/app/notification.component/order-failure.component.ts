import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: `./order-failure.component.html`,
    styles: [`
        .center-text{
            text-align: center;
        }
    `]

})
export class OrderFailureComponent implements OnInit {
    errorMessage: string;
    constructor() { }
    ngOnInit(): void {
        this.errorMessage = JSON.parse(localStorage.getItem('errorMessage'));
    }
}