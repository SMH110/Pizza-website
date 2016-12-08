import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ItemService {
    constructor(private http: Http) {
        console.log('items Service initialized');
    }

    getPizzas() {
        return this.http.get('http://localhost:3000/api/pizzas')
            .map(res => res.json());
    }
}