import { Injectable } from '@angular/core';

@Injectable()
export class GuardService {
    canGetPaymentRoute: boolean = false;
    canGetPaymentProcessRoute: boolean = JSON.parse(localStorage.getItem('canGetPaymentProcessRoute')) || false;
}