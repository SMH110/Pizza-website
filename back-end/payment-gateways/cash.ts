import { PaymentGateway } from './interfaces';
import { PersistedOrder } from '../models/orders.model';
import { sendConfirmationEmails } from "../services/confirmation-sender";

export default class Cash implements PaymentGateway {

    public async createPaymentRedirect(order: PersistedOrder): Promise<PaymentRedirectDetails> {
        order.status = "Outstanding";
        await order.save();
        sendConfirmationEmails(order);
        return {
            url: `/order/success`,
            isFullPageRedirect: false
        };
    }
}