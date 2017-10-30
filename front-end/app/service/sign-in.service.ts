import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SignInService {
    constructor(private http: Http) {
    }

    signIn(credential: AuthRequest) {
        return this.http.post('/api/admin/sign-in', credential).toPromise();
    }
}
