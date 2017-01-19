interface Item {
    _id: any;
    name: string;
    imageName: string;
}

interface Pizza extends Item {
    description: string;
    price: {
        large: number;
        medium: number;
        small: number;
    };
    // TODO Why is subType here?
    subType: string[];
}

interface Drink extends Item {
    price: number;
}

interface Side extends Item {
    price: number;
}

interface Order {
    _id?: any;
    buyer: Buyer;
    orderItems: Array<OrderItemLine>;
    deliveryMethod: 'collection' | 'delivery';
    // TODO - check if Date is the correct type to use
    date: Date;
    paymentMethod: string;
    paymentId?: string;
    total: number;
    discount: number;
    totalPayment: number;
    // TODO - specify other statuses here
    status?: "Awaiting Payment" | "Outstanding" | "Complete";
}

interface OrderItemLine {
    item: OrderItem;
    qty: number;
    price: number
}

interface OrderItem extends Item {
    nameAndSize?: string;
    size_id?: string;
    size: string;
    price: number;
}

interface Buyer {
    firstName: string;
    lastName: string;
    address: string;
    postCode: string;
    email: string;
    phone: string;
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