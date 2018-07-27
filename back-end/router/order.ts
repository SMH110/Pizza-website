import { Router } from "express";
const router = Router();
import OrderModel, { PersistedOrder } from "../models/orders.model";
import { errorHandler, IRequest, IResponse } from "./router-utils";
import {
  getPaymentGateway,
  getAvailablePaymentMethods
} from "../payment-gateways/factory";
import { validateOrderRequest } from "../../shared/validation/place-order-request-validator";
import { isDeliveryAddressRequired } from "../../shared/business-rules/delivery-address-required-rule";
import { isBillingAddressRequired } from "../../shared/business-rules/billing-address-required-rule";
import { BasketService } from "../services/basket-service";
import { PlaceOrderRequest, PaymentRedirectDetails } from "../../shared/dtos";
import { Order } from "../../shared/domain-entities";

router.post(
  "/place-order",
  errorHandler(
    async (
      req: IRequest<PlaceOrderRequest>,
      res: IResponse<PaymentRedirectDetails>
    ) => {
      console.log("Received order - constructing order");
      let basketService = new BasketService();
      basketService.deliveryMethod = req.body.deliveryMethod;
      basketService.paymentMethod = req.body.paymentMethod;
      basketService.discountCode = req.body.discountCode;

      if (req.body.voucherCode) {
        try {
          await basketService.setVoucherCode(req.body.voucherCode);
        } catch {
          return res
            .status(400)
            .json(["The voucher code you entered is not valid"]);
        }
      }

      for (let item of req.body.orderItems) {
        basketService.addToBasket(item);
      }

      let order: Order = {
        buyer: Object.assign({}, req.body.buyer),
        deliveryAddress: isDeliveryAddressRequired(req.body)
          ? req.body.deliveryAddress
          : null,
        billingAddress: isBillingAddressRequired(req.body)
          ? req.body.billingAddress
          : null,
        date: new Date(),
        deliveryMethod: req.body.deliveryMethod,
        paymentMethod: req.body.paymentMethod,
        paymentFeedback: [],
        note: req.body.note ? req.body.note : null,
        status: "Awaiting Payment",
        orderItems: basketService.items,
        discountCode: req.body.discountCode ? req.body.discountCode : null,
        discount: basketService.getDiscount(),
        voucher: basketService.voucher,
        voucherCode: basketService.voucherCode,
        total: basketService.getTotalPrice(),
        totalPayment: basketService.getTotalPayable(),
        paymentId: null
      };

      console.log(
        "Constructed order. Validating...",
        JSON.stringify(order, null, 4)
      );
      let validationErrors = validateOrderRequest(
        order,
        getAvailablePaymentMethods()
      );
      if (validationErrors.length > 0) {
        console.log(
          `Order failed validation`,
          JSON.stringify(validationErrors, null, 4)
        );
        return res.status(400).json(validationErrors);
      }

      console.log(
        `Order passed validation. Saving order`,
        JSON.stringify(order, null, 4)
      );
      let persistedOrder: PersistedOrder = (await new OrderModel(
        order
      ).save()) as any;
      console.log(`Saved order ${persistedOrder._id}`);

      console.log(`Creating payment redirect for order ${persistedOrder._id}`);
      let paymentProvider = getPaymentGateway(req);
      let paymentRedirectDetails = await paymentProvider.createPaymentRedirect(
        persistedOrder
      );
      console.log(
        `Created payment redirect for order ${persistedOrder._id}`,
        JSON.stringify(paymentRedirectDetails, null, 4)
      );
      res.json(paymentRedirectDetails);
    }
  )
);

export default router;
