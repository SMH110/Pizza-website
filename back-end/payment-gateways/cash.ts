import { PaymentGateway } from './interfaces';
import { PersistedOrder } from '../models/orders.model';
import { sendOrderPlacedEmail } from "../services/email-service";
import { updateVoucherIfNecessary } from "../services/basket-service";

export default class Cash implements PaymentGateway {

    public async createPaymentRedirect(order: PersistedOrder): Promise<PaymentRedirectDetails> {
        order.status = "Outstanding";
        await order.save();
        await updateVoucherIfNecessary(order);
        sendOrderPlacedEmail(order);
        return {
            url: `/order/success`,
            isFullPageRedirect: false
        };
    }
}
