import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { GuardService } from '../service/guard.service';
import { BasketService } from '../service/basket.service';

@Injectable()
export class PaymentProcessGuard implements CanActivate {

    constructor(private guardService: GuardService, private router: Router, private basket: BasketService) {

    }
    canActivate(): boolean {
        if (this.guardService.canGetPaymentProcessRoute) return true;
        if (this.guardService.canGetPaymentRoute) {
            this.router.navigate(["/payment"]);
            return false;
        }
        if (!this.guardService.canGetPaymentRoute && this.basket.totalQuantity > 0) {
            this.router.navigate(["/checkout"]);
            return false;
        }
        this.router.navigate(["/pizza"])
        return false;
    }
}