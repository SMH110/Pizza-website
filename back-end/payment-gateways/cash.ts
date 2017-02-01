import { PaymentGateway } from './interfaces';
import { PersistedOrder } from '../models/orders.model';

export default class Cash implements PaymentGateway {
    public async createPaymentRedirect(order: PersistedOrder): Promise<PaymentRedirectDetails> {
        
        order.status = "Outstanding";
        await order.save();

        return {
            url: `/order/success`,
            isFullPageRedirect: false
        };
    }
}