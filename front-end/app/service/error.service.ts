import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class ErrorService {
    errors: string[] = [];

    constructor(private router: Router) {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.clearErrors();
                }
            });
    }

    clearErrors(): void {
        this.errors = [];
    }

    displayErrors(errors: string[]): void {
        this.errors = errors;
        // This code should not be in this service. It's a view concern.
        setTimeout(() => {
            let errorList = document.getElementById('errorList');
            if ((errorList as any).scrollIntoViewIfNeeded !== undefined) {
                (errorList as any).scrollIntoViewIfNeeded(true/*Align to center of view*/);
            } else {
                errorList.scrollIntoView(false/*Align to bottom of view*/);
            }
        });
    }
}
