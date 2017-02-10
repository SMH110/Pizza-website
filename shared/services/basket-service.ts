import { discountCalculator } from '../discount-calculator'
import catalog from '../static-data/catalogue';
import { getPricingRule } from '../business-rules/pricing-rule-factory';

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
                price: getPricingRule(catalogItem)(item),
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

    static getDescription(item: BasketItem) {
        return [
            item.name,
            item.version,
            item.options.join(', ')
        ].filter(x => !!x).join(' - ');
    }
}
