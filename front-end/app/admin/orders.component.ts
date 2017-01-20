import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../service/order.service'
@Component({
    moduleId: module.id,
    templateUrl: './orders.component.html',
    styles: [`
   h1 {
       margin-top: 60px;
   }

   h4 {
       display: inline-block;
   }

   .date {
       color: #888;
   }

   .outstanding{
       color: #ff7e00;
   }

   .mark-complete{
       padding: 0 16px;
       margin-left: 20px;
   }
    `]
})
export class OrdersComponent implements OnInit {
    orders: Order[];

    constructor(private orderService: OrderService, private router: Router) {
    }

    ngOnInit() {
        this.refreshOrders();
        setInterval(this.refreshOrders.bind(this), 15000);
    }

    markAsComplete(id: string) {
        this.orderService.markOrderAsComplete({ orderId: id })
            .subscribe(() => {
                this.refreshOrders()
            }, error => {
                if (error.status === 401) {
                    this.router.navigateByUrl('/admin/sign-in');
                }
                if (error.status === 500) {
                    this.router.navigateByUrl('/admin/failure');
                }
            });
    }

    private refreshOrders() {
        this.orderService.getOrders()
            .subscribe(response => {
                this.orders = response.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
            }, error => {
                if (error.status === 401) {
                    this.router.navigateByUrl('/admin/sign-in');
                }
                if (error.status === 500) {
                    this.router.navigateByUrl('/admin/failure');
                }
            });
    }

    formatAddress(address: Address) {
        return [
            address.line1,
            address.line2,
            address.town,
            address.postcode
        ].filter(x => !!x).join(', ');
    }
}