// TODO - The types in this file should not be global.
// They will move over to the back-end when we start using DTOs for the Admin side.

interface Order {
    _id?: any;
    buyer: Buyer;
    deliveryAddress: Address;
    orderItems: Array<OrderLineItem>;
    deliveryMethod: 'Collection' | 'Delivery';
    date: Date;
    paymentMethod: string;
    paymentId: string;
    total: number;
    discount: number;
    totalPayment: number;
    note: string | null;
    // TODO - specify other statuses here
    status: "Awaiting Payment" | "Outstanding" | "Complete";
}

interface OrderLineItem {
    name: string;
    quantity: number;
    price: number;
    version: string;
    imageName: string;
    description: string;
}
