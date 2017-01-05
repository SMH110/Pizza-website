import { Component, OnInit } from '@angular/core';

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
    constructor(private orderService: OrderService) {

    }
    ngOnInit() {
        localStorage.removeItem('adminErrorMessage');
        this.getOrders();
        setInterval(this.getOrders.bind(this), 10000);
    }

    markAsComplete(id: string) {
        localStorage.removeItem('adminErrorMessage');
        this.orderService.postIdToUpdateOrderStatus({ id: id })
            .subscribe(response => {
                if (response.error) {
                    localStorage.setItem('adminErrorMessage', JSON.stringify(response.error))
                    window.location.assign("/admin/failure");
                    return;
                }
                this.getOrders()
            });
    }



    private getOrders() {
        // why this is undefined?!
        // someFunction.bind(this)()
        this.orderService.getOrders()
            .subscribe(response => {
                if (response.error) {
                    localStorage.setItem('adminErrorMessage', JSON.stringify(response.error))
                    window.location.assign("/admin/failure");
                    return;
                }
                this.orders = response.sort((a: Order, b: Order) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
            });
    }
}


function someFunction() {
    console.log(this);
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