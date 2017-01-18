import { Router } from 'express';
const router = Router();
import Order from '../models/orders.model';
import { authenticate } from 'passport';
import { asyncHandler } from './router-utils';
import { getPaymentGateway } from '../payment-gateways/factory';

router.post('/place-order', asyncHandler(async (req, res) => {
    let paymentProvider = getPaymentGateway(req);
    res.json(await paymentProvider.getRedirectDetails(req.body));
}));

// Route to save the orders in the mongoose database
router.post('/save-order', asyncHandler(async (req, res) => {
    await new Order(req.body).save();
    res.json({
        success: true
    });
}));

// TODO: Check what happens when authenticate fails?
router.get('/get-orders', authenticate('jwt', { session: false }), asyncHandler(async (_req, res) => {
    res.json(await Order.find());
}));

// Update order status
router.post('/update-status', asyncHandler(async (req, res) => {
    await Order.update({ _id: req.body.id }, { status: "Complete" });
    res.json({ success: true });
}));

export default router;