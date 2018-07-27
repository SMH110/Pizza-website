import { by, element } from "protractor";
import { whenVisible } from "../protractor-utils";
import {
  Buyer,
  DeliveryMethod,
  PaymentMethod,
  Address
} from "../../../shared/dtos";

class CheckoutPageObject {
  async enterPersonalDetails(details: Buyer) {
    console.log("Entering personal details...");
    await whenVisible(by.name("firstName"), firstName =>
      firstName.sendKeys(details.firstName)
    );
    await element(by.name("lastName")).sendKeys(details.lastName);
    await element(by.name("email")).sendKeys(details.email);
    await element(by.name("phone")).sendKeys(details.phone);
    console.log("Successfully entered personal details");
  }

  async enterOrderNotes(orderNotes: string) {
    console.log("Entering order notes...");
    await element(by.name("order_notes")).sendKeys(orderNotes);
    console.log("Successfully entered order notes");
  }

  async selectDeliveryMethod(deliveryMethod: DeliveryMethod) {
    console.log("Selecting delivery method...");
    await element(by.buttonText(deliveryMethod)).click();
    console.log("Successfully selected delivery method");
  }

  async selectPaymentMethod(paymentMethod: PaymentMethod) {
    console.log("Selecting payment method...");
    await element(by.buttonText(paymentMethod)).click();
    console.log("Successfully selected payment method");
  }

  async enterDeliveryAddress(address: Address) {
    console.log("Entering delivery address...");
    await element(by.name("delivery_address1")).sendKeys(address.line1);
    if (address.line2 !== undefined) {
      await element(by.name("delivery_address2")).sendKeys(address.line2);
    }
    await element(by.name("delivery_town")).sendKeys(address.town);
    await element(by.name("delivery_postcode")).sendKeys(address.postcode);
    console.log("Successfully entered delivery address");
  }

  async enterBillingAddress(address: Address) {
    console.log("Entering billing address...");
    await element(by.name("billing_address1")).sendKeys(address.line1);
    if (address.line2 !== undefined) {
      await element(by.name("billing_address2")).sendKeys(address.line2);
    }
    await element(by.name("billing_town")).sendKeys(address.town);
    await element(by.name("billing_postcode")).sendKeys(address.postcode);
    console.log("Successfully entered billing address");
  }

  async placeOrder() {
    console.log("Placing order...");
    await element(by.css(".actions .btn-success")).click();
    console.log("Successfully clicked place order");
  }
}

export const CheckoutPage = new CheckoutPageObject();
