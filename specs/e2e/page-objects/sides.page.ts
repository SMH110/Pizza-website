import { by } from "protractor";
import { whenVisible } from "../protractor-utils";
import { BaseProductPage } from "./base-product.page";

class SidesPageObject extends BaseProductPage {
    async navigate() {
        console.log('Clicking Sides link...');
        await whenVisible(by.linkText("Sides"), sidesLink => sidesLink.click());
        console.log('Successfully clicked Sides link');
    }
}

export const SidesPage = new SidesPageObject();
