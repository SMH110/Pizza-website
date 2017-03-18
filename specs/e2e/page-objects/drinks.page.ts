import { by } from "protractor";
import { whenVisible } from "../protractor-utils";
import { BaseProductPage } from "./base-product.page";

class DrinksPageObject extends BaseProductPage {
    async navigate() {
        console.log('Clicking Drinks link...');
        await whenVisible(by.linkText("Drinks"), sidesLink => sidesLink.click());
        console.log('Successfully clicked Drinks link');
    }
}

export const DrinksPage = new DrinksPageObject();
