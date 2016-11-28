import { Injectable } from '@angular/core';

import { itemInterface } from '../interfaces/item-interface';

@Injectable()
export class ItemService {
    getItems () : itemInterface[] {
        return [
    {
        "id": 1,
        "name": "Neapolitan Pizza",
        "price": 9.99,
        "type": "pizza",
        "subType": "large",
        "image" : "neapolitan-pizza.jpg"
    },
    {
        "id": 2,
        "name": "Sicilian Pizza",
        "price": 12.99,
        "type": "pizza",
        "subType": "large",
        "image" : "/images/pizzas/sicilian-pizza.jpg"
        
    },
    {
        "id": 3,
        "name": "Mushrooms Pizza",
        "price": 8.99,
        "type": "pizza",
        "subType": "large",
        "image" : "/images/pizzas/mushrooms-pizza.jpg"
        
    }
]
    }
}