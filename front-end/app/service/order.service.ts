import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {
    constructor(private http: Http) {
    }

    placeOrder(order: PlaceOrderRequest) {
        return this.http.post('/api/order/place-order', order).map(x => x.json() as PaymentRedirectDetails);
    }

    getOrders() {
        const headers = new Headers({ "Authorization": localStorage.getItem('get-orders-token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/api/order/get-orders', options).map(x => x.json() as Order[]);
    }

    markOrderAsComplete(request: MarkAsCompleteRequest) {
        const headers = new Headers({ "Authorization": localStorage.getItem('get-orders-token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/order/mark-as-complete', request, options);
    }
}