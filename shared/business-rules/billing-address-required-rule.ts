import { PaymentMethod } from "../dtos";

export function isBillingAddressRequired(dto: BillingAddressRequiredDto) {
  if (dto.paymentMethod === "Credit / Debit Card") {
    return true;
  }
  return false;
}

interface BillingAddressRequiredDto {
  paymentMethod: PaymentMethod;
}
