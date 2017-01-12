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

    addToBasket(item: ItemDetail): void {
        //  check if the item which added to the basket is pizza type
        // pizza items have selectedSize property
        let storedItem;
        if (item.selectedSize) {
            let reFormatedItem = {
                name: item.name,
                nameAndSize: `${item.name} | ${item.selectedSize}`,
                _id: item._id,
                size_id: item._id + item.selectedSize,
                size: item.selectedSize,
                price: item.price[item.selectedSize],
                imageName: item.imageName
            }
            storedItem = this.items[reFormatedItem.size_id];
            if (!storedItem) {
                storedItem = { item: reFormatedItem, qty: 0, price: 0 };
                this.items[reFormatedItem.size_id] = storedItem;
            }
        } else {
            storedItem = this.items[item._id]
            if (!storedItem) {
                storedItem = { item: item, qty: 0, price: 0 };
                this.items[item._id] = storedItem;
            }
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalPrice += storedItem.item.price;
        this.totalQuantity++;
        this.saveBasket(this)
    }

    private saveBasket(basket: this) {
        localStorage.setItem('totalQuantity', JSON.stringify(basket.totalQuantity));
        localStorage.setItem('totalPrice', JSON.stringify(basket.totalPrice));
        localStorage.setItem('items', JSON.stringify(basket.items));
    }

    generateArray(): Item[] {
        let items: Item[] = [];

        for (let item in this.items) {
            items.push(this.items[item]);
        }
        return items;
    }

    generateDescription() {
        return this.generateArray().reduce((initial, current) => initial + `${current.qty} ${current.item.nameAndSize || current.item.name}, `, "").slice(0, -2);
    }
}



type Items = { [id: string]: Item | any }
interface Item {
    item: ItemDetail;
    qty: number;
    price: number;
}

interface ItemDetail {
    name: string;
    _id: string;
    nameAndSize?: string;
    price: number | number[];
    description?: string;
    subType?: string[];
    imageName: string;
    selectedSize?: string;
}