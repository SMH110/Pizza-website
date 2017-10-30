import { Router } from 'express';
const router = Router();
import { errorHandler, IRequest, IResponse } from './router-utils';
import { BasketService } from "../services/basket-service";

router.get('/:id', errorHandler(async (req: IRequest<void>, res: IResponse<Voucher>) => {
    let basketService = new BasketService();
    try {
        let voucher = await basketService.getVoucher(req.params['id']);
        if (!voucher) {
            return res.sendStatus(404);
        }
        res.json(voucher);
    } catch (e) {
        return res.sendStatus(404);
    }
}));

export default router;
