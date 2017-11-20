import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
    public isSuperAdmin: boolean = null;

    constructor(private http: Http) {
    }

    async initialise() {
        if (this.isSuperAdmin === null) {
            let user = await this.http.get('/api/admin/current-user').toPromise().then(x => x.json() as CurrentUser);
            this.isSuperAdmin = user.type === "SuperAdmin";
        }
    }

    async getOrders() {
        await this.initialise();
        return this.http.get(this.isSuperAdmin ? '/api/admin/get-orders' : '/api/admin/get-recent-orders').toPromise().then(x => x.json() as Order[]);
    }

    getVouchers() {
        return this.http.get('/api/admin/vouchers').toPromise().then(x => x.json() as Voucher[]);
    }

    async signIn(credential: AuthRequest) {
        let user = await this.http.post('/api/admin/sign-in', credential).toPromise().then(x => x.json() as CurrentUser);
        this.isSuperAdmin = user.type === "SuperAdmin";
    }

    async signOut() {
        await this.http.get("/api/admin/sign-out").toPromise();
        this.isSuperAdmin = null;
    }

    confirmOrder(request: MarkAsCompleteRequest) {
        return this.http.post('/api/admin/confirm-order', request).toPromise();
    }

    createVoucher(request: CreateVoucherRequest) {
        return this.http.post('/api/admin/vouchers', request).toPromise();
    }
}
