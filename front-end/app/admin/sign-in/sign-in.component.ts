import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SignInService } from '../../service/sign-in.service';
import { ErrorService } from '../../service/error.service';

@Component({
    templateUrl: 'sign-in.component.html'
})
export class SignInComponent {
    username: string;
    password: string;

    constructor(private signInService: SignInService, private errorService: ErrorService, private router: Router) {
    }

    async signIn() {
        this.errorService.clearErrors();

        try {
        await this.signInService.signIn({username: this.username,password: this.password});
        this.router.navigate(['/admin/get-orders']);
        } catch (error) {
            if (error.status === 401) {
                this.errorService.displayErrors(["The username or password is incorrect."]);
            } else {
                this.errorService.displayErrors(["There was an error trying to sign in. Please try again."]);
            }
        }
    }
}
