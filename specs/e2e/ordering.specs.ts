import { browser, by, element, ElementFinder, ExpectedConditions as EC } from "protractor";
import { doInsideIFrame, urlShouldBecome, whenAnyVisible, whenClickable, whenVisible, waitForAngularToLoad, UI_READY_TIMEOUT } from './utils';

describe("E2E Tests", () => {
    beforeEach(async () => {
        await browser.restart();
        browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().setSize(1280, 1024);
    });

    it("I can add a pizza, side and drink to the basket and check out using PayPal", async () => {
        await browser.get('/');

        // Add a pizza
        await addProduct('Neapolitan Pizza');

        // Add a side
        await element(by.linkText('Sides')).click();
        await addProduct('Garlic bread');

        // Add a drink
        await element(by.linkText('Drinks')).click();
        await addProduct('Pepsi Max 330ml');

        // Go to the basket and checkout
        await element(by.partialLinkText('Basket')).click();
        await whenVisible(by.className('next'), nextButton => nextButton.click());

        // Enter personal details and continue
        await whenVisible(by.id('firstName'), firstName => firstName.sendKeys('John'));
        await element(by.id('lastName')).sendKeys('Smith');
        await element(by.id('email')).sendKeys('test@test.com');
        await element(by.id('phone')).sendKeys('01234567890');
        await element(by.id('delivery_address1')).sendKeys('1 The Street');
        await element(by.id('delivery_town')).sendKeys('Foo Town');
        await element(by.id('delivery_postcode')).sendKeys('CR72GB');

        // Select PayPal and place the order.
        await whenVisible(by.id('PayPal'), paypalOption => paypalOption.click());
        await element(by.buttonText('Order Now')).click();

        // Wait for PayPal to load
        await urlShouldBecome(url => /sandbox\.paypal\.com/.test(url));

        // Enter details and pay
        await doInsideIFrame(by.name('injectedUl'), async () => {
            await whenVisible(by.id('email'), email => email.sendKeys('csharpandsons-buyer@gmail.com'))
            await element(by.id('password')).sendKeys('test&test');
            await element(by.id('btnLogin')).click();
        });
        // TODO: Clean this up - PayPal are using some kind of spinner immediately after spinner thing
        await browser.wait(EC.stalenessOf(element(by.id('spinner'))), UI_READY_TIMEOUT);
        await new Promise(r => setTimeout(r, 500));
        await browser.wait(EC.stalenessOf(element(by.id('spinner'))), UI_READY_TIMEOUT);
        await whenClickable(by.buttonText('Continue'), payNow => payNow.click());

        // Ensure we are routed back to /order/success
        await urlShouldBecome(url => /\/order\/success/.test(url));
        await waitForAngularToLoad();

        let orderSuccess = element(by.css('.order-success'));
        await browser.wait(EC.visibilityOf(orderSuccess), UI_READY_TIMEOUT);
    });

    it("I can add a pizza, side and drink to the basket and check out using Barclays ePDQ", async () => {
        await browser.get('/');

        // Add a pizza
        await addProduct('Neapolitan Pizza');

        // Add a side
        await element(by.linkText('Sides')).click();
        await addProduct('Garlic bread');

        // Add a drink
        await element(by.linkText('Drinks')).click();
        await addProduct('Pepsi Max 330ml');

        // Go to the basket and checkout
        await element(by.partialLinkText('Basket')).click();
        await whenVisible(by.className('next'), nextButton => nextButton.click());

        // Enter personal details and continue
        await whenVisible(by.id('firstName'), firstName => firstName.sendKeys('John'));
        await element(by.id('lastName')).sendKeys('Smith');
        await element(by.id('email')).sendKeys('test@test.com');
        await element(by.id('phone')).sendKeys('01234567890');
        await element(by.id('delivery_address1')).sendKeys('1 The Street');
        await element(by.id('delivery_town')).sendKeys('Foo Town');
        await element(by.id('delivery_postcode')).sendKeys('CR72GB');

        // Select Credit / Debit Card and place the order.
        await whenVisible(by.id('VISA'), visaOption => visaOption.click());
        await element(by.buttonText('Order Now')).click();

        // Wait for PayPal to load
        await urlShouldBecome(url => /mdepayments\.epdq\.co\.uk/.test(url));

        await whenVisible(by.id('Ecom_Payment_Card_Number'), cardNumber => cardNumber.sendKeys('4111111111111111'));
        await element(by.id('Ecom_Payment_Card_ExpDate_Month')).sendKeys('01');
        await element(by.id('Ecom_Payment_Card_ExpDate_Year')).sendKeys('2022');
        await element(by.id('Ecom_Payment_Card_Verification')).sendKeys('123');
        await element(by.id('submit3')).click();
        
        // Ensure we are routed back to /order/success
        await urlShouldBecome(url => /\/order\/success/.test(url));
        await waitForAngularToLoad();

        let orderSuccess = element(by.css('.order-success'));
        await browser.wait(EC.visibilityOf(orderSuccess), UI_READY_TIMEOUT);
    });
});

async function addProduct(name: string) {
    let pizza = await whenAnyVisible(by.className('product'), async products => {
        return products.filter(async (x: ElementFinder) => await x.element(by.tagName('h3')).getText() === name).first();
    });
    await pizza.element(by.className('btn-primary')).click();
}

// Legacy PayPal checkout method
// await whenVisible(by.id('login_email'), email => email.sendKeys('csharpandsons-buyer@gmail.com'))
// await element(by.id('login_password')).sendKeys('test&test');
// await element(by.id('submitLogin')).click();
// await whenVisibleAndNotMoving(by.id('continue'), payNow => payNow.click());