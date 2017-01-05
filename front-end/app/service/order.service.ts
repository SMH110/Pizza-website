import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { BasketService } from './basket.service';
@Injectable()
export class OrderService {
    constructor(private http: Http, private basket: BasketService) {
    }

    postOrder() {
        const postBody = {
            transactions: [
                {
                    amount:
                    {
                        total: Math.round(this.basket.totalPrice * 100) / 100,
                        currency: "GBP"
                    },
                    description: this.basket.generateDescription()
                }]
        }
        const headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/order/get-token', postBody, options)
            .map(this.extractData)


    }

    private extractData(res: Response) {
        return res.json() || {};
    }


    postPayerId(payerId: string, paymentId: string) {
        const postBody = {
            "payerId": payerId,
            "payment_id": paymentId
        }
        const headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/order/execute', postBody, options)
            .map(this.extractData)
    }

    postOrderDetails(orderDetails: OrderDetail) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/api/order/save-order', orderDetails, options)
            .map(this.extractData)
    }


    getOrders() {
        return this.http.get('/api/order/get-orders')
            .map(this.extractData)
    }


    postIdToUpdateOrderStatus(id: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post('/api/order/update-status', id, options)
            .map(this.extractData)
    }

}


interface OrderDetail {
    buyer: {
        firstName: string;
        lastName: string;
        address: string;
        postCode: string;
        email: string;
        phone: string;
    },
    orderItems: OrderItem;
    deliveryMethod: string;
    date: Date;
    paymentMethod: string;
    total: number;
    discount: number;
    totalPayment: number;
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
    size: string;
    price: number;
    imageName: string;
}