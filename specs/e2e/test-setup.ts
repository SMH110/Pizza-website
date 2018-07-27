import { browser } from "protractor";
import { randomBytes } from "crypto";
import Order, { PersistedOrder } from "../../back-end/models/orders.model";
import "../../back-end/config/dev.config";
import "../../back-end/startup/initialise-mongoose";

export class TestSetup {
  static async beforeEach() {
    await browser.restart();
    await browser.driver
      .manage()
      .window()
      .setSize(1280, 1024);
    browser.waitForAngularEnabled(false);
    await browser.get("/");
  }

  static async deleteOrderFor(firstName: string) {
    await Order.findOneAndRemove({ buyer: { firstName } } as PersistedOrder);
  }

  static getRandomString() {
    return randomBytes(4).toString("hex");
  }
}
