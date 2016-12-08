import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  providers : [ItemService]
})
export class AppComponent implements OnInit {
  constructor() {

  }
  ngOnInit(): void {

  }
}
