import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
    public isSuperAdmin = false;

    constructor(private http: Http) {
    }

    getOrders() {
        return this.http.get('/api/admin/get-orders').toPromise().then(x => x.json() as Order[]);
    }

    getVouchers() {
        return this.http.get('/api/admin/vouchers').toPromise().then(x => x.json() as Voucher[]);
    }

    async signIn(credential: AuthRequest) {
        try {
            let username = credential.username;
            if (username === "superadmin") {
                credential.username = "admin";
            }
            await this.http.post('/api/admin/sign-in', credential).toPromise();
            this.isSuperAdmin = username === "superadmin";
        } catch {
            this.isSuperAdmin = false;
        }
    }

    signOut() {
        this.isSuperAdmin = false;
        return this.http.get("/api/admin/sign-out").toPromise();
    }

    confirmOrder(request: MarkAsCompleteRequest) {
        return this.http.post('/api/admin/confirm-order', request).toPromise();
    }

    createVoucher(request: CreateVoucherRequest) {
        return this.http.post('/api/admin/vouchers', request).toPromise();
    }
}
