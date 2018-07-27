import { Request, Response, Router } from "express";
const router = Router();

import Order from "../models/orders.model";
import { getErrors } from "../services/error-service";

router.get(
  "/check",
  errorHandlerWithoutRemembering(async (_req, res) => {
    res.send(`OK - ${new Date().toLocaleString()}`);
  })
);

router.get(
  "/database",
  errorHandlerWithoutRemembering(async (_req, res) => {
    await Order.findOne();
    res.send("OK");
  })
);

router.get("/errors", (_req, res) => {
  let errors = getErrors();

  if (errors.length > 1) {
    res.sendStatus(500);
  } else {
    res.send("OK");
  }
});

function errorHandlerWithoutRemembering(
  handler: (req: Request, res: Response) => Promise<any>
) {
  return async function(req: Request, res: Response) {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(
        `Error handling request to ${req.protocol +
          "://" +
          req.get("host") +
          req.originalUrl}`,
        error
      );
      res.sendStatus(500);
    }
  };
}

export default router;
