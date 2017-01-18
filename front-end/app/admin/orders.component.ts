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
        this.getOrders();
        setInterval(this.getOrders.bind(this), 15000);
    }

    markAsComplete(id: string) {
        this.orderService.postIdToUpdateOrderStatus({ id: id })
            .subscribe(response => {
                if (response.success) {
                    this.getOrders()
                }
            }, error => {
                if (error.status === 500) {
                    this.router.navigateByUrl('/admin/failure');
                }
            });
    }



    private getOrders() {


        this.orderService.getOrders()
            .subscribe(response => {
                this.orderService.orders = response.sort((a: Order, b: Order) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
            }, error => {
                if (error.status === 401) {
                    this.router.navigateByUrl('/admin/sign-in');
                }
                if (error.status === 500) {
                    this.router.navigateByUrl('/admin/failure');
                }
            });
    }
}


interface Order {
    buyer: {
        firstName: String;
        lastName: String;
        address: String;
        postCode: String;
        email: String;
        phone: String;
    };
    orderItems: OrderItem[];
    deliveryMethod: String;
    date: Date;
    paymentMethod: String;
    total: Number;
    discount: Number;
    totalPayment: Number;
    status: string;
    note: string;
}


interface OrderItem {
    item: Item;
    qty: number;
    price: number
}

interface Item {
    name: string;
    nameAndSize?: string;
    _id: string;
    size_id?: string;
    size?: string;
    price: number;
    imageName: string;
}