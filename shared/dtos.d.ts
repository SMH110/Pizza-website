interface Item {
    name: string;
    imageName: string;
}

interface Pizza extends Item {
    description: string;
    price: { [version: string]: number };
}

interface Drink extends Item {
    price: number;
}

interface Side extends Item {
    price: number;
}

interface PlaceOrderRequest {
    buyer: Buyer;
    deliveryAddress?: Address;
    orderItems: BasketItem[];
    deliveryMethod: 'collection' | 'delivery';
    paymentMethod: string;
}

interface BasketItem {
    name: string;
    quantity: number;
    version?: string;
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