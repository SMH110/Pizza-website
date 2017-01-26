import * as thirtyPercent from './discount-strategies/30-percent-discount';

let discounts = [thirtyPercent];
export function discountCalculator(basket: any) {
    let discount = discounts.map(x => {
        return {
            name: x.default.name,
            amount: normalise(x.default.apply(basket))
        }
    })
        .filter(x => x.amount > 0)
    [0] || null;


return discount ? discount.amount : 0
}

function normalise(value: number): number {
    return Math.round(value * 100) / 100;
}
