import { whenVisible, waitForAngularToLoad, urlShouldBecome } from "../protractor-utils";
import { by, browser, element } from "protractor";

class AdminSignInPageObject {
    async navigate() {
        console.log('Navigating to Admin site...');
        await browser.get("/admin/sign-in");
        await waitForAngularToLoad();
        console.log('Successfully navigated to Admin site');
    }

    async signIn() {
        console.log('Signing into Admin site...');
        await whenVisible(by.name('username'), email => email.sendKeys('admin'));
        await element(by.name('password')).sendKeys('test');
        await element(by.buttonText('Sign in')).click();
        console.log('Sign in clicked...');
        await urlShouldBecome(url => /\/orders/.test(url));
        console.log('Successfully signed in, now on orders page');
    }
}

export const AdminSignInPage = new AdminSignInPageObject();
