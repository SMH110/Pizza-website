import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {
    constructor(private http: Http) {
    }

    placeOrder(order: PlaceOrderRequest) {
        return this.http.post('/api/order/place-order', order).toPromise().then(x => x.json() as PaymentRedirectDetails);
    }

    getAvailablePaymentMethods() {
        return this.http.get('/api/payment/methods').toPromise().then(x => x.json() as PaymentMethod[]);
    }
}
