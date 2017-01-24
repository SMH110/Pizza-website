export default {
    name: '30% Discount',
    apply(basket: BasketItemWithPrice[]) {
        let total = sum(flatten(basket));
        return total >= 25 ? total * 0.3 : 0;
    }
}


function flatten(basket: BasketItemWithPrice[]): FlattenedItem[] {
    let flattenedItem = [];
    for (let item of basket) {
        for (let i = 0; i < item.quantity; i++) {
            let clone = Object.assign({}, item);
            delete clone.quantity;
            flattenedItem.push(clone)
        }
    }

    return flattenedItem;
}

function sum(items: any[]): number {
    return items.reduce((x, y) => x + y.price, 0);
}


interface BasketItemWithPrice extends BasketItem {
    price: number;
    imageName: string;
}


interface FlattenedItem extends Item {
    price: number;
}