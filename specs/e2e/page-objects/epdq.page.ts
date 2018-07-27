import { by, element } from "protractor";
import { whenVisible, urlShouldBecome } from "../protractor-utils";

class EPDQPageObject {
  async pay() {
    console.log("Waiting for EPDQ page to load...");
    await urlShouldBecome(url => /mdepayments\.epdq\.co\.uk/.test(url));
    console.log("Waiting for VISA icon to appear...");
    await whenVisible(by.name("VISA_brand"), VisaBrand => VisaBrand.click());
    console.log("Waiting for Card number field to appear...");
    await whenVisible(by.id("Ecom_Payment_Card_Number"), CardNumber =>
      CardNumber.sendKeys("4111111111111111")
    );
    await element(by.id("Ecom_Payment_Card_ExpDate_Month")).sendKeys("01");
    await element(by.id("Ecom_Payment_Card_ExpDate_Year")).sendKeys("2022");
    await element(by.id("Ecom_Payment_Card_Verification")).sendKeys("123");
    console.log("Successfully filled out card details");
    await element(by.id("submit3")).click();
    console.log("Successfully clicked submit");
  }
}

export const EPDQPage = new EPDQPageObject();

// Card number: 4111111111111111
// Expiry Month: 01
// Expiry Year: 2022
// Security Code: 123
