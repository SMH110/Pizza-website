import { expect } from "chai";
import { validateOrderRequest } from "../../../shared/validation/place-order-request-validator";
import { createValidOrders, PAYMENT_METHODS } from "./order-helpers";

describe("Shop Opening Times validation", () => {
  it("When the shop is open at 00:29 on Monday (Sunday night)", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 23, 0, 29, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed at 00:30 on Monday (Sunday night)", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 23, 0, 30, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is closed at 16:29 on Monday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 23, 16, 29, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is open at 16:30 on Monday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 23, 16, 30, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is open at 00:29 on Tuesday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 24, 0, 29, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed at 00:30 on Tuesday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 24, 0, 30, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is closed at 16:29 on Tuesday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 24, 16, 29, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is open at 16:30 on Tuesday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 24, 16, 30, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is open at 00:29 on Wednesday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 25, 0, 29, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed at 00:30 on Wednesday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 25, 0, 30, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is closed at 16:29 on Wednesday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 25, 16, 29, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is open at 16:30 on Wednesday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 25, 16, 30, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is open at 00:29 on Thursday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 26, 0, 29, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed at 00:30 on Thursday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 26, 0, 30, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is closed at 16:29 on Thursday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 26, 16, 29, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is open at 16:30 on Thursday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 26, 16, 30, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is open at 02:59 on Friday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 27, 2, 59, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed at 03:00 on Friday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 27, 3, 0, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is closed at 11:59 on Friday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 27, 11, 59, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is open at 12:00 on Friday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 27, 12, 0, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is open at 02:59 on Saturday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 28, 2, 59, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed at 03:00 on Saturday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 28, 3, 0, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is closed at 11:59 on Saturday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 28, 11, 59, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is open at 12:00 on Saturday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 28, 12, 0, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is open at 02:59 on Sunday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 29, 2, 59, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed at 03:00 on Sunday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 29, 3, 0, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is closed at 11:59 on Sunday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 29, 11, 59, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is open at 12:00 on Sunday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 29, 12, 0, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed and the user has no items - only shop closed error should be returned", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 0, 24, 1, 1, 0);
      order.orderItems = [];
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is closed at 11:59 on Spring bank holiday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 4, 29, 11, 59, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });

  it("When the shop is open at 12:00 on Spring bank holiday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 4, 29, 12, 0, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is open at 02:59 the day after Spring bank holiday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 4, 30, 2, 59, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
    }
  });

  it("When the shop is closed at 03:00 the day after Spring bank holiday", () => {
    for (let order of createValidOrders()) {
      order.date = new Date(2017, 4, 30, 3, 0, 0);
      expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([
        "Sorry, the shop is now closed."
      ]);
    }
  });
});
