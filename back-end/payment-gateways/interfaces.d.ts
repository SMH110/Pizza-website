import { PersistedOrder } from '../models/orders.model';
import { PaymentRedirectDetails } from '../../shared/dtos';

export interface PaymentGateway {
    createPaymentRedirect: (order: PersistedOrder) => Promise<PaymentRedirectDetails>;
}
