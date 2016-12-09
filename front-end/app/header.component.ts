import { Component, OnInit, Input } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'my-header',
    templateUrl: `./header.component.html`,
})
export class HeaderComponent implements OnInit {
    @Input() totalQuantity: number;
    constructor() {

    }
    ngOnInit(): void {

    }
}
