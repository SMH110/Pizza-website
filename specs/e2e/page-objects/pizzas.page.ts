import { by } from "protractor";
import { whenVisibleAndNotMoving, whenNotPresent } from "../protractor-utils";
import { BaseProductPage } from "./base-product.page";

class PizzasPageObject extends BaseProductPage {
  async addPizza(name: string, version: string, ...options: string[]) {
    await this.addProduct(name, version);
    console.log("Waiting for add pizza modal to be visible...");
    let modal = await whenVisibleAndNotMoving(by.className("add-pizza-modal"));
    if (options.length > 0) {
      for (let option of options) {
        console.log("Adding topping " + option);
        await modal.element(by.css(".topping select")).sendKeys(option);
        await modal.element(by.buttonText("Add topping")).click();
        console.log("Successfully added topping " + option);
      }
    }
    console.log("Adding pizza to basket...");
    await modal.element(by.partialButtonText("Add to Basket")).click();
    console.log(
      "Successfully clicked add pizza to basket... waiting for modal to disappear..."
    );
    await whenNotPresent(by.className("add-pizza-modal"));
    console.log("Add Pizza Modal successfully disappeared...");
  }
}

export const PizzasPage = new PizzasPageObject();
