import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { GuardService } from '../service/guard.service';
import { BasketService } from '../service/basket.service';

@Injectable()
export class PaymentGuard implements CanActivate {

    constructor(private guardService: GuardService, private router: Router, private basket: BasketService) {

    }
    canActivate(): boolean {
        if (this.guardService.canGetPaymentRoute) return true;
        if (this.basket.getTotalQuantity() > 0) {
            this.router.navigate(["/checkout"])
            return false;
        }
        this.router.navigate(["/pizza"])
        return false;
    }
}