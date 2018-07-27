export interface Item {
    name: string;
    imageName: string;
    description: string;
    tags: Tag[];
    price: { [version: string]: number } | number;
}

export interface Topping {
    type: ToppingCategory;
    name: string;
}

export interface PlaceOrderRequest {
    buyer: Buyer;
    deliveryAddress: Address;
    billingAddress: Address;
    orderItems: BasketItem[];
    deliveryMethod: DeliveryMethod;
    paymentMethod: PaymentMethod;
    note: string | null
    discountCode: string;
    voucherCode: string;
}

export interface BasketItem {
    name: string;
    quantity: number;
    version: string;
    options: string[];
}

export interface Buyer {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface Address {
    line1: string;
    line2?: string;
    town: string;
    postcode: string;
}

export interface MarkAsCompleteRequest {
    orderId: string;
    readyInMinutes: number;
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface PaymentRedirectDetails {
    url: string;
    isFullPageRedirect: boolean;
}

export interface Discount {
    name: string;
    amount: number;
}

export interface CreateVoucherRequest {
    email: string;
    amount: number;
}

export interface CurrentUser {
    type: "SuperAdmin" | "Admin";
}

export type DeliveryMethod = 'Collection' | 'Delivery';
export type PaymentMethod = 'PayPal' | 'Credit / Debit Card' | 'Cash';
export type Tag = 'salad' | 'dessert' | 'ice cream' | 'drink' | 'pizza' | 'calzone' | 'pasta' | 'side' | 'hot' | 'vegetarian' | 'bottle' | 'can';
export type ToppingCategory = 'Cheese' | 'Vegetable' | 'Meat' | 'Seafood' | 'Other';
