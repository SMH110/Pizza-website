export function saveBasket(basket: any): void {
    localStorage.setItem('totalQuantity', JSON.stringify(basket.totalQuantity));
    localStorage.setItem('totalPrice', JSON.stringify(basket.totalPrice));
    localStorage.setItem('items', JSON.stringify(basket.items));
}


export const storedQuantity = localStorage.getItem('totalQuantity');
export const storedTotalPrice = localStorage.getItem('totalPrice');
export const storedItems = localStorage.getItem('items');