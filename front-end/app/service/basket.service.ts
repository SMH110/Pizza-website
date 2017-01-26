import { Injectable } from '@angular/core';
import { discountCalculator } from '../../../shared/discount-calculator'
@Injectable()
export class BasketService {
    items: BasketItemViewModel[] = [];

    addToBasket(itemToAdd: ItemToAdd, selectedVersion?: string): void {
        let existingItem = this.getExistingItem(itemToAdd, selectedVersion);
        if (existingItem !== undefined) {
            existingItem.quantity++;
        } else {
            this.items.push({
                name: itemToAdd.name,
                price: typeof itemToAdd.price === 'number' ? itemToAdd.price : itemToAdd.price[selectedVersion],
                imageUrl: itemToAdd.imageName,
                quantity: 1,
                version: selectedVersion
            });
        }
    }

    increase(item: BasketItemViewModel) {
        item.quantity++;
    }

    decrease(item: BasketItemViewModel) {
        item.quantity--;
    }

    removeItem(item: BasketItemViewModel): void {
        this.items.splice(this.items.indexOf(item), 1);
    }

    removeAll(): void {
        this.items = [];
    }

    getTotalPrice(): number {
        return this.items.reduce((totalPrice, item) => totalPrice += item.price * item.quantity, 0);
    }

    getTotalQuantity(): number {
        return this.items.reduce((totalQuantity, item) => totalQuantity += item.quantity, 0);
    }
    getDiscount(): number {
        return discountCalculator(this.getTotalPrice());
    }
    getTotalPayable():number{
        return this.getTotalPrice() - this.getDiscount();
    }
    getExistingItem(itemToAdd: ItemToAdd, selectedVersion?: string): BasketItemViewModel {
        return this.items.find(x =>
            x.name === itemToAdd.name &&
            x.version === selectedVersion
        );
    }
}

export interface BasketItemViewModel extends BasketItem {
    price: number;
    imageUrl: string;
}

type ItemToAdd = Pizza | Drink | Side;