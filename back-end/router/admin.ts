import { Router } from "express";
import * as session from "express-session";
import OrderModel from "../models/orders.model";
import VoucherModel from "../models/vouchers.model";
import { errorHandler, IRequest, IResponse } from "./router-utils";
import {
  sendOrderConfirmedEmail,
  sendVoucherCode,
  resendFailedEmails
} from "../services/email-service";
import * as moment from "moment";
import { clearErrors, storeError } from "../services/error-service";
import {
  AuthRequest,
  CurrentUser,
  MarkAsCompleteRequest,
  CreateVoucherRequest
} from "../../shared/dtos";
import { Order, Voucher } from "../../shared/domain-entities";

const router = Router();

// Session
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;
router.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * MINUTE },
    rolling: true
  })
);

router.post(
  "/sign-in",
  errorHandler(
    async (req: IRequest<AuthRequest>, res: IResponse<CurrentUser>) => {
      if (
        req.body.username !== process.env.ADMIN_USERNAME &&
        req.body.username !== process.env.SUPER_ADMIN_USERNAME
      ) {
        console.log(
          `Username ${req.body.username} incorrect. Attempt from IP Address: ${
            req.ip
          }.`
        );
        return res.sendStatus(401);
      }
      if (
        req.body.username === process.env.ADMIN_USERNAME &&
        req.body.password === process.env.ADMIN_PASSWORD
      ) {
        req.session["isAdmin"] = true;
        return res.json({ type: "Admin" });
      }
      if (
        req.body.username === process.env.SUPER_ADMIN_USERNAME &&
        req.body.password === process.env.SUPER_ADMIN_PASSWORD
      ) {
        req.session["isAdmin"] = true;
        req.session["isSuperAdmin"] = true;
        return res.json({ type: "SuperAdmin" });
      }
      console.log(
        `Password ${req.body.password} incorrect for ${
          req.body.username
        } user. Attempt from IP Address: ${req.ip}.`
      );
      return res.sendStatus(401);
    }
  )
);

router.get(
  "/current-user",
  ensureLoggedIn,
  errorHandler(async (req: IRequest<void>, res: IResponse<CurrentUser>) => {
    if (req.session["isSuperAdmin"]) {
      return res.json({ type: "SuperAdmin" });
    }
    return res.json({ type: "Admin" });
  })
);

router.get(
  "/get-recent-orders",
  ensureLoggedIn,
  errorHandler(async (_req, res: IResponse<Order[]>) => {
    res.json(
      await OrderModel.find({
        date: { $gte: new Date(Date.now() - DAY) }
      })
    );
  })
);

router.get(
  "/get-orders",
  ensureLoggedIn,
  ensureSuperAdmin,
  errorHandler(async (_req, res: IResponse<Order[]>) => {
    return res.json(
      await OrderModel.find({
        date: { $gte: new Date(Date.now() - YEAR) }
      })
    );
  })
);

router.post(
  "/confirm-order",
  ensureLoggedIn,
  errorHandler(async (req: IRequest<MarkAsCompleteRequest>, res) => {
    let order = await OrderModel.findById(req.body.orderId);
    // Create and save voucher
    let voucher = {
      email: order.buyer.email,
      amount: parseFloat((order.totalPayment * 0.1).toFixed(2)),
      dateIssued: new Date(),
      dateUsed: null,
      expiryDate: moment(new Date())
        .add(28, "days")
        .toDate(),
      code: require("crypto")
        .randomBytes(6)
        .toString("hex")
    } as Voucher;
    await new VoucherModel(voucher).save();

    // Wait for the order confirmed email to be sent
    await sendOrderConfirmedEmail(order, voucher, req.body.readyInMinutes);

    //  Mark the order as complete
    order.status = "Complete";

    await order.save();
    res.send();
  })
);

router.get(
  "/vouchers",
  ensureLoggedIn,
  ensureSuperAdmin,
  errorHandler(async (_req, res: IResponse<Voucher[]>) => {
    res.json(await VoucherModel.find());
  })
);

router.post(
  "/vouchers",
  ensureLoggedIn,
  ensureSuperAdmin,
  errorHandler(
    async (req: IRequest<CreateVoucherRequest>, res: IResponse<void>) => {
      let voucher = {
        email: req.body.email,
        amount: req.body.amount,
        dateIssued: new Date(),
        dateUsed: null,
        expiryDate: moment(new Date())
          .add(14, "days")
          .toDate(),
        code: require("crypto")
          .randomBytes(6)
          .toString("hex")
      } as Voucher;
      await new VoucherModel(voucher).save();
      await sendVoucherCode(voucher);
      res.sendStatus(200);
    }
  )
);

router.get(
  "/sign-out",
  errorHandler(async (req, res) => {
    req.session.destroy(error => {
      if (error) {
        storeError(error);
        console.error("Error destroying session");
        console.error(error);
      }
    });
    res.sendStatus(200);
  })
);

router.get(
  "/clear-errors",
  ensureLoggedIn,
  ensureSuperAdmin,
  errorHandler(async (_req: IRequest<void>, res: IResponse<void>) => {
    clearErrors();
    res.sendStatus(200);
  })
);

router.get(
  "/resend-emails",
  ensureLoggedIn,
  ensureSuperAdmin,
  errorHandler(async (_req: IRequest<void>, res: IResponse<void>) => {
    // Not awaiting because there's no harm in a fire and forget here
    resendFailedEmails();
    res.sendStatus(200);
  })
);

export default router;

function ensureLoggedIn(
  req: IRequest<void>,
  res: IResponse<void>,
  next: (err?: any) => void
) {
  if (req.session["isAdmin"]) {
    next();
  } else {
    res.sendStatus(401);
  }
}

function ensureSuperAdmin(
  req: IRequest<void>,
  res: IResponse<void>,
  next: (err?: any) => void
) {
  if (req.session["isSuperAdmin"]) {
    next();
  } else {
    res.sendStatus(403);
  }
}
