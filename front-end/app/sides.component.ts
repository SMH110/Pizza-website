import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';

@Component({
    moduleId: module.id,
    templateUrl: `./sides.component.html`,
})
export class SidesComponent implements OnInit {
    sides: Side[]
    constructor(private ItemService: ItemService) {
    }

    ngOnInit(): void {
        this.ItemService.getSides()
            .subscribe(sides => this.sides = sides);
    }
}


interface Side {
    name: string,
    price: number,
    imageName: string
}