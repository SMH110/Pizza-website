import { Router } from 'express';
const router = Router();

import { errorHandler } from './router-utils';
import Order from '../models/orders.model';

router.get('/check', errorHandler(async (_req, res) => {
    res.send(`OK - ${new Date().toLocaleString()}`);
}));

router.get('/database', errorHandler(async (_req, res) => {
    await Order.findOne();
    res.send("OK");
}));

export default router;
