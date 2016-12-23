import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderService } from './../service/order.service';


@Component({
    moduleId: module.id,
    templateUrl: `./payment-processing.component.html`,

})
export class PaymentProcess implements OnInit, OnDestroy {

    dots = "";
    Processing = "Processing ";
    fullLoading = "";

    private subscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }



    updateLoading(): void {
        if (this.dots === "...") {
            console.log(" I have run");
            this.dots = "";
        }
        this.dots += ".";

        this.fullLoading = this.Processing + this.dots;

    }

    ngOnInit(): void {
        console.log(localStorage.getItem('execute-url'));
        setInterval(this.updateLoading, 500);
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                console.log(param);
                this.orderService.postPayerId(param['PayerID'], localStorage.getItem('access-token'))
                    .subscribe(response => {
                        window.location.assign("/pizza")
                    });
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }
}

