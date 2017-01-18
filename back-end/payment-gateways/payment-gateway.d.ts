interface PaymentGateway {
    getRedirectDetails: (basket: any) => Promise<PaymentRedirectDetails>;
}

interface PaymentRedirectDetails {
    url: string;
    isFullPageRedirect: boolean;
}