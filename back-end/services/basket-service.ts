import VoucherModel, { PersistedVoucher } from "../models/vouchers.model";
import { PersistedOrder } from "../models/orders.model";
import { BasketService as SharedBasketService } from "../../shared/services/basket-service";
import { Voucher } from "../../shared/domain-entities";

export class BasketService extends SharedBasketService {
  async getVoucher(code: string): Promise<PersistedVoucher> {
    let voucher = await VoucherModel.findOne({
      code,
      dateUsed: null
    } as Voucher);
    if (!voucher) {
      throw new Error(this.voucherInvalidMessage);
    }
    return voucher;
  }
}

export async function updateVoucherIfNecessary(order: PersistedOrder) {
  if (order.voucherCode) {
    let voucher = await new BasketService().getVoucher(order.voucherCode);
    voucher.dateUsed = new Date();
    await voucher.save();
  }
}
