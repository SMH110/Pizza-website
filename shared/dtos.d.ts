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
    _id: any;
    buyer: Buyer;
    orderItems: Array<Item>;
    deliveryMethod: 'collection' | 'delivery';
    // TODO - check if Date is the correct type to use
    date: Date;
    paymentMethod: 'paypal';
    total: number;
    discount: number;
    totalPayment: number;
    // TODO - specify other statuses here
    status: "Outstanding" | "Complete";
}

interface Buyer {
    firstName: string;
    lastName: string;
    address: string;
    postCode: string;
    email: string;
    phone: string;
}

interface ApiResponse {
    success: boolean;
}