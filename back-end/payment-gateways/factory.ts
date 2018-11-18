import { IRequest } from "../router/router-utils";
import PayPal, { IsPayPalEnabled } from "./paypal";
import BarclaysEPDQ, { IsBarclaysEPDQEnabled } from "./barclays-epdq";
import { PaymentGateway } from "./interfaces";
import Cash from "./cash";
import { PlaceOrderRequest, PaymentMethod } from "../../shared/dtos";
import CreditDebitCardInPerson, {
  IsCreditDebitCardInPersonEnabled
} from "./credit-debit-card-in-person";

export function getPaymentGateway(
  req: IRequest<PlaceOrderRequest>
): PaymentGateway {
  let baseReturnAddress = req.protocol + "://" + req.get("host");
  if (req.body.paymentMethod === "PayPal") {
    return new PayPal(baseReturnAddress);
  }
  if (req.body.paymentMethod === "Credit / Debit Card") {
    return new BarclaysEPDQ(baseReturnAddress);
  }
  if (req.body.paymentMethod === "Credit / Debit card (in person)") {
    return new CreditDebitCardInPerson();
  }
  if (req.body.paymentMethod === "Cash") {
    return new Cash();
  }

  throw new Error(
    `No payment gateway registered for payment method ${req.body.paymentMethod}`
  );
}

export function getAvailablePaymentMethods(): PaymentMethod[] {
  let paymentMethods: PaymentMethod[] = ["Cash"];
  if (IsPayPalEnabled) {
    paymentMethods.push("PayPal");
  }
  if (IsCreditDebitCardInPersonEnabled) {
    paymentMethods.push("Credit / Debit card (in person)");
  }
  if (IsBarclaysEPDQEnabled) {
    paymentMethods.push("Credit / Debit Card");
  }
  return paymentMethods;
}
