import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  providers: [ItemService, BasketService]
})
export class AppComponent implements OnInit {
  constructor() {

  }
  ngOnInit(): void {

  }
}
