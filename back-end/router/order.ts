import { Router } from 'express';
const router = Router();
import Order from '../models/orders.model';
import { authenticate } from 'passport';
import { errorHandler, IRequest, IResponse } from './router-utils';
import { getPaymentGateway } from '../payment-gateways/factory';
import { calculateOrderDetails } from '../services/checkout-calculator';
import { validateOrderRequest } from '../../shared/validation/place-order-request-validator';

router.post('/place-order', errorHandler(async (req: IRequest<PlaceOrderRequest>, res: IResponse<PaymentRequestDetails>) => {
    console.log('Received order - constructing order')
    let calculatedOrderDetails = calculateOrderDetails(req.body);
    let order: Order = {
        buyer: Object.assign({}, req.body.buyer),
        deliveryAddress: req.body.deliveryMethod === 'Delivery' ? req.body.deliveryAddress : null,
        date: new Date(),
        deliveryMethod: req.body.deliveryMethod,
        paymentMethod: req.body.paymentMethod,
        note: req.body.note ? req.body.note : null,
        status: 'Awaiting Payment',
        orderItems: calculatedOrderDetails.orderLineItems,
        discount: calculatedOrderDetails.discount,
        total: calculatedOrderDetails.total,
        totalPayment: calculatedOrderDetails.totalPayment,
        paymentId: null
    };
    console.log('Constructed order', JSON.stringify(order, null, 4));
    console.log('Validating order')
    let validationErrors = validateOrderRequest(order, ['paypal']);
    if (validationErrors.length > 0) {
        console.log('Order failed validation', JSON.stringify(validationErrors, null, 4));
        return res.json(400, validationErrors);
    }
    console.log('Order passed validation. Creating payment request for order');
    let paymentProvider = getPaymentGateway(req);
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