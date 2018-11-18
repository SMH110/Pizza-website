import { PaymentGateway } from "./interfaces";
import { PersistedOrder } from "../models/orders.model";
import { sendOrderPlacedEmail } from "../services/email-service";
import { updateVoucherIfNecessary } from "../services/basket-service";
import { PaymentRedirectDetails } from "../../shared/dtos";

export const IsCreditDebitCardInPersonEnabled =
  process.env.CREDIT_DEBIT_CARD_IN_PERSON_ENABLED === "TRUE";

export default class CreditDebitCardInPerson implements PaymentGateway {
  public async createPaymentRedirect(
    order: PersistedOrder
  ): Promise<PaymentRedirectDetails> {
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
