import { Router } from 'express';
const router = Router();
import Order from '../models/orders.model';
import { authenticate } from 'passport';
import { errorHandler, IRequest, IResponse } from './router-utils';
import { getPaymentGateway } from '../payment-gateways/factory';

router.post('/place-order', errorHandler(async (req: IRequest<Order>, res: IResponse<PaymentRequestDetails>) => {
    console.log('Received order - constructing order')
    let paymentProvider = getPaymentGateway(req);
    let order: Order = {
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
    console.log('Constructed order', JSON.stringify(order, null, 4));
    console.log('Creating payment request for order');
    let paymentRequestDetails = await paymentProvider.createPaymentRequest(order);
    console.log('Created payment request', JSON.stringify(paymentRequestDetails, null, 4));
    order.paymentId = paymentRequestDetails.paymentId;
    console.log('Saving order', JSON.stringify(order, null, 4));
    let savedOrder = await new Order(order).save();
    console.log(`Saved order ${savedOrder._id}`);
    res.json(paymentRequestDetails);
}));

// TODO: Move to admin.ts
router.get('/get-orders', authenticate('jwt', { session: false }), errorHandler(async (_req, res: IResponse<Order[]>) => {
    res.json(await Order.find());
}));

// TODO: Move to admin.ts
router.post('/mark-as-complete', authenticate('jwt', { session: false }), errorHandler(async (req: IRequest<MarkAsCompleteRequest>, res) => {
    await Order.update({ _id: req.body.orderId }, { status: "Complete" });
    res.send();
}));

export default router;