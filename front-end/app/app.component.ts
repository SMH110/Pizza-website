import { Component, OnInit } from '@angular/core';

import { ItemService } from './service/items.service';
import { BasketService } from './service/basket.service';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  providers: [ItemService]
})
export class AppComponent implements OnInit {
  constructor(private basket: BasketService, private router: Router) {


  }
  ngOnInit(): void {
    console.log(this.router);
  }


  isHeaderShown(): boolean {
    if (this.router.url === "/admin/get-orders" || this.router.url === "/admin/sign-in") {
      return false
    }

    return true
  }

  isFooterShown(): boolean {
    if (this.router.url === "/admin/get-orders" || this.router.url === "/admin/sign-in") {
      return false
    }

    return true
  }


}


