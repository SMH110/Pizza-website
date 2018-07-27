import { by, ElementFinder } from "protractor";
import { whenAnyVisible } from "../protractor-utils";

export abstract class BaseProductPage {
  async addProduct(name: string, version?: string) {
    console.log(`Locating item ${name} to add to basket...`);
    let product = await whenAnyVisible(
      by.className("thumbnail"),
      async products => {
        // TODO - Remove the any cast here
        return products
          .filter((async (x: ElementFinder) =>
            (await x.element(by.tagName("h3")).getText()) === name) as any)
          .first();
      }
    );
    if (version !== undefined) {
      console.log(`Selecting version ${version}...`);
      await product.element(by.tagName("select")).sendKeys(version);
    }
    console.log("Clicking add...");
    await product.element(by.className("btn-primary")).click();
    console.log(`Successfully added item ${name} to basket`);
  }
}
