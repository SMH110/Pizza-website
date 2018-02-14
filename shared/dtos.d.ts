interface Item {
    name: string;
    imageName: string;
    description: string;
    tags: Tag[];
    price: { [version: string]: number } | number;
}

interface Topping {
    type: ToppingCategory;
    name: string;
}

interface PizzaBase {
    name: string;
    displayName: string;
    price: number;
}

interface PlaceOrderRequest {
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

interface BasketItem {
    name: string;
    quantity: number;
    version: string;
    options: string[];
}

interface Buyer {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface Address {
    line1: string;
    line2?: string;
    town: string;
    postcode: string;
}

interface MarkAsCompleteRequest {
    orderId: string;
    readyInMinutes: number;
}

interface AuthRequest {
    username: string;
    password: string;
}

interface PaymentRedirectDetails {
    url: string;
    isFullPageRedirect: boolean;
}

interface Discount {
    name: string;
    amount: number;
}

interface CreateVoucherRequest {
    email: string;
    amount: number;
}

interface CurrentUser {
    type: "SuperAdmin" | "Admin";
}

type DeliveryMethod = 'Collection' | 'Delivery';
type PaymentMethod = 'PayPal' | 'Credit / Debit Card' | 'Cash';
type Tag = 'salad' | 'dessert' | 'ice cream' | 'drink' | 'pizza' | 'calzone' | 'pasta' | 'side' | 'hot' | 'vegetarian' | 'bottle' | 'can';
type ToppingCategory = 'Cheese' | 'Vegetable' | 'Meat' | 'Seafood' | 'Other';
