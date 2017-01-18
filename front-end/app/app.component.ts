import { Component } from '@angular/core';

import { ItemService } from './service/items.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  providers: [ItemService]
})
export class AppComponent {
  constructor(private router: Router) {
  }

  isHeaderShown(): boolean {
    if (this.router.url === "/admin/get-orders" || this.router.url === "/admin/sign-in" || this.router.url === "/admin/failure") {
      return false
    }

    return true
  }

  isFooterShown(): boolean {
    if (this.router.url === "/admin/get-orders" || this.router.url === "/admin/sign-in" || this.router.url === "/admin/failure") {
      return false
    }

    return true
  }
}
