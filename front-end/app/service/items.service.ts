import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ItemService {
    constructor(private http: Http) {
    }

    getPizzas() {
        return this.http.get('http://localhost:3000/api/pizzas')
            .map(res => res.json());
    }

    getSides() {
        return this.http.get('http://localhost:3000/api/sides')
            .map(res => res.json());
    }

    getDrinks() {
        return this.http.get('http://localhost:3000/api/drinks')
            .map(res => res.json());
    }

}