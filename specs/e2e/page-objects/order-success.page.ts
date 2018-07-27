import {
  urlShouldBecome,
  whenVisible,
  waitForAngularToLoad
} from "../protractor-utils";
import { by } from "protractor";

class OrderSuccessPageObject {
  async isEventuallyDisplayed() {
    console.log("Waiting for order success page to load...");
    await urlShouldBecome(url => /\/order\/success/.test(url));
    console.log("Waiting for Angular to load...");
    await waitForAngularToLoad();
    console.log("Waiting for order success component to load...");
    await whenVisible(by.className("order-success"));
    console.log("Successfully seen order success message");
  }
}

export const OrderSuccessPage = new OrderSuccessPageObject();
