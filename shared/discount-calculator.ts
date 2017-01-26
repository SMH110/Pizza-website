export function discountCalculator(orderTotal: number): number | null {
    if (orderTotal >= 25) {
        return orderTotal * 0.3;
    }
    return null;
}