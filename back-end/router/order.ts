import { Router } from 'express';
const router = Router();
import Order, { PersistedOrder } from '../models/orders.model';
import { authenticate } from 'passport';
import { errorHandler, IRequest, IResponse } from './router-utils';
import { getPaymentGateway, getAvailablePaymentMethods } from '../payment-gateways/factory';
import { BasketService } from '../../shared/services/basket-service';
import { validateOrderRequest } from '../../shared/validation/place-order-request-validator';
import { isDeliveryAddressRequired } from '../../shared/business-rules/delivery-address-required-rule';
import { isBillingAddressRequired } from '../../shared/business-rules/billing-address-required-rule';

router.post('/place-order', errorHandler(async (req: IRequest<PlaceOrderRequest>, res: IResponse<PaymentRedirectDetails>) => {
    console.log('Received order - constructing order')
    let basketService = new BasketService();
    for (let item of req.body.orderItems) {
        basketService.addToBasket(item);
    }

    let order: Order = {
        buyer: Object.assign({}, req.body.buyer),
        deliveryAddress: isDeliveryAddressRequired(req.body) ? req.body.deliveryAddress : null,
        billingAddress: isBillingAddressRequired(req.body) ? req.body.billingAddress : null,
        date: new Date(),
        deliveryMethod: req.body.deliveryMethod,
        paymentMethod: req.body.paymentMethod,
        paymentFeedback: [],
        note: req.body.note ? req.body.note : null,
        status: 'Awaiting Payment',
        orderItems: basketService.items,
        discount: basketService.getDiscount(),
        total: basketService.getTotalPrice(),
        totalPayment: basketService.getTotalPayable(),
        paymentId: null
    };

    console.log('Constructed order. Validating...', JSON.stringify(order, null, 4));
    let validationErrors = validateOrderRequest(order, getAvailablePaymentMethods());
    if (validationErrors.length > 0) {
        console.log(`Order failed validation`, JSON.stringify(validationErrors, null, 4));
        return res.status(400).json(validationErrors);
    }

    console.log(`Order passed validation. Saving order`, JSON.stringify(order, null, 4));
    let persistedOrder: PersistedOrder = await new Order(order).save() as any;
    console.log(`Saved order ${persistedOrder._id}`);

    console.log(`Creating payment redirect for order ${persistedOrder._id}`);
    let paymentProvider = getPaymentGateway(req);
    let paymentRedirectDetails = await paymentProvider.createPaymentRedirect(persistedOrder);
    console.log(`Created payment redirect for order ${persistedOrder._id}`, JSON.stringify(paymentRedirectDetails, null, 4));
    res.json(paymentRedirectDetails);
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
