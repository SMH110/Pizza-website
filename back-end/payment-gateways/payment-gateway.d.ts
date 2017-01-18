interface PaymentGateway {
    getRedirectDetails: (order: Order) => Promise<PaymentRedirectDetails>;
}

interface PaymentRedirectDetails {
    url: string;
    isFullPageRedirect: boolean;
}