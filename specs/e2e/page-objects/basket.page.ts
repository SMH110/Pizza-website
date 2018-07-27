import { by } from "protractor";
import { whenVisible } from "../protractor-utils";

class BasketPageObject {
  async navigate() {
    console.log("Clicking Basket link...");
    await whenVisible(by.partialLinkText("Basket"), basketLink =>
      basketLink.click()
    );
    console.log("Successfully clicked Basket link");
  }

  async checkout() {
    console.log("Clicking Checkout button on basket page...");
    await whenVisible(by.className("next"), nextButton => nextButton.click());
    console.log("Successfully clicked Checkout button");
  }
}

export const BasketPage = new BasketPageObject();
