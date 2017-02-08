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

interface PlaceOrderRequest {
    buyer: Buyer;
    deliveryAddress: Address;
    billingAddress: Address;
    orderItems: BasketItem[];
    deliveryMethod: DeliveryMethod;
    paymentMethod: PaymentMethod;
    note: string | null
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
}

interface AuthRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
}

interface PaymentRedirectDetails {
    url: string;
    isFullPageRedirect: boolean;
}

type DeliveryMethod = 'Collection' | 'Delivery';
type PaymentMethod = 'PayPal' | 'MasterCard' | 'JCB' | 'Maestro' | 'VISA' | 'Cash';
type Tag = 'salad' | 'dessert' | 'drink' | 'pizza' | 'calzone' | 'pasta' | 'side' | 'hot' | 'vegetarian';
type ToppingCategory = 'Cheese' | 'Vegetable' | 'Meat' | 'Seafood' | 'Other';
