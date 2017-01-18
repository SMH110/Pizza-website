import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ItemService {
    constructor(private http: Http) {
    }

    getPizzas() {
        return this.http.get('/api/products/pizzas')
            .map(res => res.json());
    }

    getSides() {
        return this.http.get('/api/products/sides')
            .map(res => res.json());
    }

    getDrinks() {
        return this.http.get('/api/products/drinks')
            .map(res => res.json());
    }

}