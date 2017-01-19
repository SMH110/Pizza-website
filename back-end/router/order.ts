import { Router } from 'express';
const router = Router();
import Order from '../models/orders.model';
import { authenticate } from 'passport';
import { asyncHandler, IRequest, IResponse } from './router-utils';
import { getPaymentGateway } from '../payment-gateways/factory';

router.post('/place-order', asyncHandler(async (req: IRequest<Order>, res: IResponse<PaymentRequestDetails>) => {
    let paymentProvider = getPaymentGateway(req);
    let order: Order = {
        _id: null,
        buyer: Object.assign({}, req.body.buyer),
        date: req.body.date, // TODO - set on server side
        deliveryMethod: req.body.deliveryMethod,
        discount: req.body.discount, // TODO - set on server side
        orderItems: req.body.orderItems,
        paymentMethod: req.body.paymentMethod,
        status: 'Awaiting Payment',
        total: req.body.total, // TODO - set on server side
        totalPayment: req.body.totalPayment // TODO - set on server side
    };

    let paymentRequestDetails = await paymentProvider.createPaymentRequest(order);
    order.paymentId = paymentRequestDetails.paymentId;

    await new Order(order).save();
    res.json(paymentRequestDetails);
}));

// TODO: Move to admin.ts
router.get('/get-orders', authenticate('jwt', { session: false }), asyncHandler(async (_req, res: IResponse<Order[]>) => {
    res.json(await Order.find());
}));

// TODO: Move to admin.ts
router.post('/update-status', authenticate('jwt', { session: false }), asyncHandler(async (req, res: IResponse<ApiResponse>) => {
    await Order.update({ _id: req.body.id }, { status: "Complete" });
    res.json({ success: true });
}));

export default router;