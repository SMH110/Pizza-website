import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {
    constructor(private http: Http) {
    }

    placeOrder(order: PlaceOrderRequest) {
        return this.http.post('/api/order/place-order', order).map(x => x.json() as PaymentRedirectDetails);
    }

    getOrders() {
        return this.http.get('/api/admin/get-orders').map(x => x.json() as Order[]);
    }

    getAvailablePaymentMethods() {
        return this.http.get('/api/payment/methods').map(x => x.json() as PaymentMethod[]);
    }

    signOut() {
        return this.http.get("/api/admin/sign-out");
    }

    confirmOrder(request: MarkAsCompleteRequest) {
        return this.http.post('/api/admin/confirm-order', request);
    }
}
