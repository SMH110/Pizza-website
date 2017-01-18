import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {
    constructor(private http: Http) {
    }

    placeOrder(order: Order) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/order/place-order', order, options)
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
        return this.http.post('/api/paypal/execute', postBody, options)
            .map(this.extractData)
    }

    getOrders() {
        const headers = new Headers({ "Content-Type": "application/json", "Authorization": localStorage.getItem('get-orders-token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/api/order/get-orders', options)
            .map(this.extractData)
    }

    postIdToUpdateOrderStatus(id: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post('/api/order/update-status', id, options)
            .map(this.extractData)
    }
}