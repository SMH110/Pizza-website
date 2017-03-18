import { by, element } from "protractor";
import { whenVisible, urlShouldBecome, doInsideIFrame, whenNotPresent, whenClickable, whenVisibleAndNotMoving } from "../protractor-utils";

class PayPalPageObject {
    async pay() {
        console.log('Waiting for PayPal page to load...');
        await urlShouldBecome(url => /sandbox\.paypal\.com/.test(url));

        try {
            await this.payNew();
        } catch (e) {
            console.log('New PayPal UI payment failed', e);
            await this.payLegacy();
        }
    }

    async payNew() {
        console.log('Attempting to pay using the new PayPal UI...');
        // Enter details and pay
        await doInsideIFrame(by.name('injectedUl'), async () => {
            await whenVisible(by.id('email'), email => email.sendKeys('csharpandsons-buyer@gmail.com'))
            await element(by.id('password')).sendKeys('test&test');
            await element(by.id('btnLogin')).click();
        });
        // TODO: Clean this up - PayPal are using some kind of spinner immediately after spinner thing
        await whenNotPresent(by.id('spinner'));
        await new Promise(r => setTimeout(r, 500));
        await whenNotPresent(by.id('spinner'));
        await whenClickable(by.buttonText('Continue'), payNow => payNow.click());
        console.log('Successfully paid using the new PayPal UI');
    }

    async payLegacy() {
        console.log('Attempting to pay using the legacy PayPal UI...');
        await whenVisible(by.id('login_email'), email => email.sendKeys('csharpandsons-buyer@gmail.com'))
        await element(by.id('login_password')).sendKeys('test&test');
        await element(by.id('submitLogin')).click();
        await whenVisibleAndNotMoving(by.id('continue'), payNow => payNow.click());
        console.log('Successfully paid using the legacy PayPal UI');
    }
}

export const PayPalPage = new PayPalPageObject();
