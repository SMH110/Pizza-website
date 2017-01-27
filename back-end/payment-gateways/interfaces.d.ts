import { PersistedOrder } from '../models/orders.model';

export interface PaymentGateway {
    createPaymentRedirect: (order: PersistedOrder) => Promise<PaymentRedirectDetails>;
}