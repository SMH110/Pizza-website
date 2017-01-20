import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { BasketService } from '../service/basket.service';

@Injectable()
export class CheckoutGuard implements CanActivate {

    constructor(private basket: BasketService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.basket.getTotalQuantity() > 0) return true;
        this.router.navigate(["/pizza"])
        return false;
    }
}