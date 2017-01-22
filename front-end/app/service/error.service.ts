import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
    errors: string[] = [];

    clearErrors(): void {
        this.errors = [];
    }

    displayErrors(errors: string[]): void {
        this.errors = errors;
    }
}