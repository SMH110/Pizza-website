export function saveBasket(basket: any): void {
    localStorage.setItem('totalQuantity', JSON.stringify(basket.totalQuantity));
    localStorage.setItem('totalPrice', JSON.stringify(basket.totalPrice));
    localStorage.setItem('items', JSON.stringify(basket.items));
}

export function saveFormDetails(formDetails: CheckoutForm) {
    localStorage.setItem('checkout-details', JSON.stringify(formDetails));
}

export function saveInputValue(value: any) {
    localStorage.setItem('checkout-details', JSON.stringify(value));
}

export const storedQuantity = localStorage.getItem('totalQuantity');
export const storedTotalPrice = localStorage.getItem('totalPrice');
export const storedItems = localStorage.getItem('items');
export function clearSomeItemsFromLocalStorage(){
    localStorage.removeItem('items');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalQuantity');
    localStorage.removeItem('canGetPaymentProcessRoute');
}
interface CheckoutForm {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    postCode: string;
    email: string;
    phone: string;
    deliveryMethod: string;
}