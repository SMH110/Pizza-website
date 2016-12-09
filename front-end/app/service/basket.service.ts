import { Injectable } from '@angular/core';
import { storedItems, storedQuantity, storedTotalPrice } from '../utils';

@Injectable()
export class BasketService {
    items: Items;
    totalQuantity: number;
    totalPrice: number;

    constructor() {
        this.items = JSON.parse(storedItems || '{}');
        this.totalQuantity = JSON.parse(storedQuantity || '0');
        this.totalPrice = JSON.parse(storedTotalPrice || '0');
    }

    generateArray(): Item[] {
        let items: Item[] = [];

        for (let item in this.items) {
            items.push(this.items[item]);
        }
        return items;
    }
}



type Items = { [id: string]: Item | any }
interface Item {
    item: ItemDetail,
    qty: number,
    price: number
}

interface ItemDetail {
    name: string,
    price: number | number[],
    description?: string,
    subType?: string[],
    imageName: string,
}