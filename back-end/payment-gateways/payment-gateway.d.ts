interface PaymentGateway {
    createPaymentRequest: (order: Order) => Promise<PaymentRequestDetails>;
}

interface PaymentRequestDetails {
    url: string;
    paymentId?: string;
    isFullPageRedirect: boolean;
}