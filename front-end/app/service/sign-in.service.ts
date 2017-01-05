import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SignInService {
    constructor(private http: Http) {

    }


    postAndGetTokenForSingingIn(credential: Credential) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post('/api/admin/sign-in', credential, options)
            .map(this.extractData)
    }

    private extractData(res: Response) {
        return res.json() || {};
    }

}


interface Credential {
    email: string;
    password: string;
}