import { Component, OnInit } from '@angular/core';

import { ItemService } from './items.service';
import { itemInterface } from '../interfaces/item-interface';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  providers: [ItemService]
})
export class AppComponent implements OnInit {
  constructor(private _itemService: ItemService) {

  }
  items: itemInterface[];
  ngOnInit(): void {
    this.items = this._itemService.getItems();
  }
}
