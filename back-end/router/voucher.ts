import { Router } from "express";
const router = Router();
import { errorHandler, IRequest, IResponse } from "./router-utils";
import { BasketService } from "../services/basket-service";
import { Voucher } from "../../shared/domain-entities";

router.get(
  "/:id",
  errorHandler(async (req: IRequest<void>, res: IResponse<Voucher>) => {
    let basketService = new BasketService();
    try {
      let voucher = await basketService.getVoucher(req.params["id"]);
      if (!voucher) {
        return res.sendStatus(404);
      }
      if (new Date() > voucher.expiryDate) {
        return res.sendStatus(404);
      }
      res.json(voucher);
    } catch {
      return res.sendStatus(404);
    }
  })
);

export default router;
