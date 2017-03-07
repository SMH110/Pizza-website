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
        const headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/api/admin/get-orders', options).map(x => x.json() as Order[]);
    }

    getAvailablePaymentMethods() {
        return this.http.get('/api/payment/methods').map(x => x.json() as PaymentMethod[]);
    }

    signOut() {
        const headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/api/admin//sign-out", options);
    }

    markOrderAsComplete(request: MarkAsCompleteRequest) {
        const headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/admin/mark-as-complete', request, options);
    }
}
