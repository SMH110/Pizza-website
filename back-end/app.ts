console.log("app.ts - Top of file");

import "./config/dev.config";
import "./startup/initialise-mongoose";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

import { initialisePayPalEndpoints } from "./payment-gateways/paypal";
import { initialiseBarclaysEPDQEndpoints } from "./payment-gateways/barclays-epdq";

import clientSide from "./router/client-side";
import order from "./router/order";
import voucher from "./router/voucher";
import admin from "./router/admin";
import health from "./router/health";
import payment from "./router/payment";

const app = express();
const nocache = require("nocache");

console.log("app.ts - Requires/imports done");

// Static Files
app.use((_req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31557600");
  next();
}, express.static(path.join(__dirname, "..", "dist")));

// JSON Requests
app.use(bodyParser.json());

// Register Routes
console.log("app.ts - Registering routes");
app.use("/api/order", nocache(), order);
app.use("/api/voucher", nocache(), voucher);
app.use("/api/admin", nocache(), admin);
app.use("/api/payment", nocache(), payment);
app.use("/health", nocache(), health);
app.use(nocache(), clientSide);

// Register Payment Gateways
console.log("app.ts - Registering payment gateways");
initialisePayPalEndpoints(app);
initialiseBarclaysEPDQEndpoints(app);

const port = +process.env.PORT;
console.log(`app.ts - Starting up server on port ${port}`);
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`);
});
