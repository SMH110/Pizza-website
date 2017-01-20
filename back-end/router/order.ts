import { Router } from 'express';
const router = Router();
import Order from '../models/orders.model';
import { authenticate } from 'passport';
import { errorHandler, IRequest, IResponse } from './router-utils';
import { getPaymentGateway } from '../payment-gateways/factory';
import { calculateOrderDetails } from '../services/checkout-calculator';

router.post('/place-order', errorHandler(async (req: IRequest<PlaceOrderRequest>, res: IResponse<PaymentRequestDetails>) => {
    console.log('Received order - constructing order')
    let paymentProvider = getPaymentGateway(req);
    let calculatedOrderDetails = calculateOrderDetails(req.body);
    let order: Order = {
        buyer: Object.assign({}, req.body.buyer),
        date: new Date(),
        deliveryMethod: req.body.deliveryMethod,
        paymentMethod: req.body.paymentMethod,
        status: 'Awaiting Payment',
        orderItems: calculatedOrderDetails.orderLineItems,
        discount: calculatedOrderDetails.discount,
        total: calculatedOrderDetails.total,
        totalPayment: calculatedOrderDetails.totalPayment,
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