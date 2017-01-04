import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';
import {Router} from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  providers: [ItemService]
})
export class AppComponent implements OnInit {
  totalQ: number;
  constructor(private basket:BasketService, private router: Router) {
    this.router.routerState.root.data.subscribe(data => {
      console.log('isAdmin', data['isAdmin']);
    });

  }
  ngOnInit(): void {
  
  }
}
