import genericPricingRule from '../generic-pricing-rule';

export function sum(array: { price: number }[]) {
    return array.reduce((total, item) => total += item.price, 0);
}

export function sortByPrice(array: { price: number }[]) {
    return array.slice().sort((x, y) => x.price - y.price);
}

export function getBasePrices(items: OrderLineItem[]): OrderLineItem[] {
    return items.map(item => Object.assign({}, item, { price: genericPricingRule(item) }));
}

export function flatten(items: OrderLineItem[]): FlattenedOrderLineItem[] {
    return items.reduce((flattened, item) => {
        let count = item.quantity;
        while (count--) {
            let itemToAdd = Object.assign({}, item);
            delete itemToAdd.quantity;
            flattened.push(itemToAdd);
        }
        return flattened;
    }, []);
}

interface FlattenedOrderLineItem {
    name: string;
    price: number;
    version: string;
    imageName: string;
    description: string;
    tags: Tag[];
    options: string[];
}
