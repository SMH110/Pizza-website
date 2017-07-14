import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
    constructor(private http: Http) {
    }

    getOrders() {
        return this.http.get('/api/admin/get-orders').toPromise().then(x => x.json() as Order[]);
    }

    getVouchers() {
        return this.http.get('/api/admin/vouchers').toPromise().then(x => x.json() as Voucher[]);
    }

    signOut() {
        return this.http.get("/api/admin/sign-out").toPromise();
    }

    confirmOrder(request: MarkAsCompleteRequest) {
        return this.http.post('/api/admin/confirm-order', request);
    }
}
