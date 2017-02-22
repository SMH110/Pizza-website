import catalog from '../static-data/catalogue';
import { getPricingRule } from '../business-rules/pricing-rule-factory';
import { discounts } from '../business-rules/discounts/discounts';

export class BasketService {
    items: OrderLineItem[] = [];
    deliveryMethod: DeliveryMethod = null;
    paymentMethod: PaymentMethod = null;

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

    getDiscount(): Discount {
        return discounts
            .map(x => ({
                name: x.name,
                amount: this.normalise(x.calculate({
                    totalPrice: this.getTotalPrice(),
                    deliveryMethod: this.deliveryMethod,
                    items: this.items
                }))
            }))
            .filter(x => x.amount > 0)
            .sort((x, y) => y.amount - x.amount)[0] || null;
    }

    getTotalPayable(): number {
        let discount = this.getDiscount();
        let discountAmount = discount !== null ? discount.amount : 0;
        return this.normalise(this.getTotalPrice() - discountAmount);
    }

    private normalise(value: number): number {
        return Math.round(value * 100) / 100
    }

    getExistingItem(item: BasketItem): OrderLineItem {
        return this.items.find(x => {
            return x.name === item.name &&
                x.version === item.version &&
                x.options.slice().sort().join() === item.options.slice().sort().join()
        }
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
