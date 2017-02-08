import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `./app.component.html`
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
