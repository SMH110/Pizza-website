import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderService } from './../service/order.service';

@Component({
    moduleId: module.id,
    templateUrl: `./payment-processing.component.html`
})
export class PaymentProcess implements OnInit, OnDestroy {
    dots = "";
    Processing = "Processing ";
    fullLoading = "";
    private subscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private router: Router) {
    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.queryParams.subscribe((param: any) => {
            this.orderService.postPayerId(param['PayerID'], param['paymentId'])
                .subscribe(() => {
                    localStorage.removeItem('canGetPaymentProcessRoute');
                    localStorage.removeItem('checkout-details');
                    this.router.navigate(["/order/success"]);
                }, error => {
                    if (error.status === 500) {
                        this.router.navigate(["/order/failure"]);
                    }
                });
        });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }
}



