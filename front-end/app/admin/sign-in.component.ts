import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SignInService } from '../service/sign-in.service';
import { ErrorService } from '../service/error.service';

@Component({
    moduleId: module.id,
    templateUrl: 'sign-in.component.html',
    styles: [`
fieldset {
    font-family: sans-serif;
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 15px;
   }

fieldset legend {
    padding: 5px 10px ;
    margin-left: 20px;
    display: inline-block;
    border: 0;
    width :auto;
    font-weight: bold;
    font-size: 2.2em;
}
.container{
    padding-top : 75px;
}

.danger-danger{
    padding: 5px 15px;
    margin : 5px 0;
}
  
    `]
})
export class SignInComponent {
    constructor(private signInService: SignInService, private errorService: ErrorService, private router: Router) {
    }

    getTokenAndSignIn(form: NgForm) {
        this.errorService.clearErrors();

        this.signInService.signIn(form.value)
            .subscribe(response => {
                localStorage.setItem('get-orders-token', response.token);
                this.router.navigate(['/admin/get-orders']);
            }, error => {
                if (error.status === 401) {
                    this.errorService.displayErrors(["The email address or password is incorrect."]);
                } else {
                    this.errorService.displayErrors(["There was an error trying to sign in. Please try again."]);
                }
            })
    }

    preventDefault(event: Event): void {
        event.preventDefault();
    }
}