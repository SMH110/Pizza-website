import { discountCalculator } from '../discount-calculator'
import catalog from '../static-data/catalogue';
import { PizzaToppingPrices } from '../static-data/toppings';

export class BasketService {
    items: OrderLineItem[] = [];

    addToBasket(item: BasketItem): void {
        let existingItem = this.getExistingItem(item);
        if (existingItem !== undefined) {
            existingItem.quantity += item.quantity;
        } else {
            let catalogItem = catalog.find(x => x.name === item.name);
            if (catalogItem === undefined) {
                throw new Error(`Item with name ${item.name} not found in the catalog`)
            }
            this.items.push({
                name: item.name,
                description: catalogItem.description,
                price: this.calculateItemPrice(item, catalogItem),
                imageName: catalogItem.imageName,
                quantity: item.quantity,
                version: item.version,
                tags: catalogItem.tags,
                options: item.options
            });
        }
    }

    increase(item: OrderLineItem) {
        item.quantity++;
    }

    decrease(item: OrderLineItem) {
        item.quantity--;
    }

    removeItem(item: OrderLineItem): void {
        this.items.splice(this.items.indexOf(item), 1);
    }

    removeAll(): void {
        this.items = [];
    }

    getTotalPrice(): number {
        return this.normalise(this.items.reduce((totalPrice, item) => totalPrice += item.price * item.quantity, 0));
    }

    getTotalQuantity(): number {
        return this.items.reduce((totalQuantity, item) => totalQuantity += item.quantity, 0);
    }

    getDiscount(): number {
        return this.normalise(discountCalculator(this.getTotalPrice()));
    }

    getTotalPayable(): number {
        return this.normalise(this.getTotalPrice() - this.getDiscount());
    }

    private normalise(value: number): number {
        return Math.round(value * 100) / 100
    }

    getExistingItem(item: BasketItem): OrderLineItem {
        return this.items.find(x =>
            x.name === item.name &&
            x.version === item.version
        );
    }

    private calculateItemPrice(item: BasketItem, catalogItem: Item) {
        let price = typeof catalogItem.price === 'number' ? catalogItem.price : catalogItem.price[item.version];
        if (catalogItem.tags.indexOf('pizza') !== -1) {
            price += item.options.length * PizzaToppingPrices[item.version];
        }
        return price;
    }
}
