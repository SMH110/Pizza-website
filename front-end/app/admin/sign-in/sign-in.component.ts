import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ErrorService } from "../../service/error.service";
import { AdminService } from "../../service/admin.service";

@Component({
  templateUrl: "./sign-in.component.html"
})
export class SignInComponent {
  username: string;
  password: string;

  constructor(
    private adminService: AdminService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  async signIn() {
    this.errorService.clearErrors();

    try {
      await this.adminService.signIn({
        username: this.username,
        password: this.password
      });
      this.router.navigate(["/admin/orders"]);
    } catch (error) {
      if (error.status === 401) {
        this.errorService.displayErrors([
          "The username or password is incorrect."
        ]);
      } else {
        this.errorService.displayErrors([
          "There was an error trying to sign in. Please try again."
        ]);
      }
    }
  }
}
