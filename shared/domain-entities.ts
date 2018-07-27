import { Buyer, Discount, DeliveryMethod, PaymentMethod, Tag, Address } from "./dtos";

// TODO - The types in this file should not be global.
// They will move over to the back-end when we start using DTOs for the Admin side.

export interface Order {
    buyer: Buyer;
    deliveryAddress: Address;
    billingAddress: Address;
    orderItems: Array<OrderLineItem>;
    deliveryMethod: DeliveryMethod;
    date: Date;
    paymentMethod: PaymentMethod;
    paymentId: string;
    paymentFeedback: any[];
    total: number;
    discountCode: string;
    discount: Discount;
    voucher: Voucher;
    voucherCode: string;
    totalPayment: number;
    note: string | null;
    // TODO - specify other statuses here
    status: "Awaiting Payment" | "Outstanding" | "Complete" | "Refunded";
}

export interface OrderLineItem {
    name: string;
    quantity: number;
    price: number;
    version: string;
    imageName: string;
    description: string;
    tags: Tag[];
    options: string[];
}

export interface Voucher {
    code: string;
    email: string;
    amount: number;
    dateIssued: Date;
    dateUsed: Date;
    expiryDate: Date;
}
