import { Component } from '@angular/core';
import { ItemService } from '../service/items.service';

@Component({
    moduleId: module.id,
    templateUrl: `./sides.component.html`,
})
export class SidesComponent {
    sides: Item[];

    constructor(private itemService: ItemService) {
        this.itemService.getSides()
            .subscribe(sides => this.sides = sides);
    }
}
