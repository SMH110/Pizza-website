import { Router } from 'express';
const router = Router();
import { errorHandler, IResponse } from './router-utils';
import { getAvailablePaymentMethods } from '../payment-gateways/factory';
import { PaymentMethod } from '../../shared/dtos';

router.get('/methods', errorHandler(async (_req, res: IResponse<PaymentMethod[]>) => {
    res.json(getAvailablePaymentMethods());
}));

export default router;
