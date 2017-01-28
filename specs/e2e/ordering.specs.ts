import { browser, by, element, ElementFinder, ExpectedConditions as EC } from "protractor";
import { doInsideIFrame, urlShouldBecome, whenAnyVisible, whenClickable, whenVisible, waitForAngularToLoad, UI_READY_TIMEOUT } from './utils';
import { randomBytes } from 'crypto';
import { expect } from 'chai';

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
        let firstName = 'John ' + getRandomString();
        let lastName = 'Smith';
        await whenVisible(by.id('firstName'), firstNameInput => firstNameInput.sendKeys(firstName));
        await element(by.id('lastName')).sendKeys(lastName);
        await element(by.id('email')).sendKeys('john-smith@test.com');
        await element(by.id('phone')).sendKeys('01234567890');
        await element(by.id('delivery_address1')).sendKeys('1 The Street');
        await element(by.id('delivery_town')).sendKeys('Foo Town');
        await element(by.id('delivery_postcode')).sendKeys('CR7 2GB');
        await element(by.id('order_notes')).sendKeys('Some test order notes');

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

        // Go to Admin site
        await browser.get('/admin/sign-in');
        await waitForAngularToLoad();

        // Log into Admin site
        await whenVisible(by.id('email'), email => email.sendKeys('test@test.com'));
        await element(by.id('password')).sendKeys('test');
        await element(by.buttonText('Sign in')).click();

        // Look for order
        let fullName = `${firstName} ${lastName}`;
        let orderSummary = await whenAnyVisible(by.className('order-summary'), orderSummaries =>
            orderSummaries.filter(async (summary: ElementFinder) => await summary.element(by.className('name')).getText() === fullName).first());

        // Test order summary as expected
        expect(await orderSummary.element(by.className('status')).getText()).to.equal('Outstanding');
        expect(await orderSummary.element(by.className('address')).getText()).to.equal('1 The Street, Foo Town, CR7 2GB');
        expect(await orderSummary.element(by.className('total-payment')).getText()).to.equal('£22.41 (VISA)');

        // Test order details are visible as expected
        let orderId = await orderSummary.getAttribute('id');
        let orderDetails = element(by.id(`details_${orderId}`));
        expect(await orderDetails.isDisplayed()).to.be.true;
        expect(await orderDetails.element(by.className('email')).getText()).to.equal('john-smith@test.com');
        expect(await orderDetails.element(by.className('payment-reference')).getText()).to.not.equal('');
        expect(await orderDetails.element(by.className('order-notes')).getText()).to.equal('Some test order notes');
        let orderItems = await element.all(by.css(`#details_${orderId} .order-item`));
        expect(await orderItems[0].element(by.className('name')).getText()).to.equal('Neapolitan Pizza - large');
        expect(await orderItems[0].element(by.className('quantity')).getText()).to.equal('1');
        expect(await orderItems[0].element(by.className('price')).getText()).to.equal('£16.99');
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
        let firstName = 'John ' + getRandomString();
        let lastName = 'Smith';
        await whenVisible(by.id('firstName'), firstNameInput => firstNameInput.sendKeys(firstName));
        await element(by.id('lastName')).sendKeys(lastName);
        await element(by.id('email')).sendKeys('john-smith@test.com');
        await element(by.id('phone')).sendKeys('01234567890');
        await element(by.id('delivery_address1')).sendKeys('1 The Street');
        await element(by.id('delivery_town')).sendKeys('Foo Town');
        await element(by.id('delivery_postcode')).sendKeys('CR7 2GB');
        await element(by.id('order_notes')).sendKeys('Some test order notes');

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

        // Go to Admin site
        await browser.get('/admin/sign-in');
        await waitForAngularToLoad();

        // Log into Admin site
        await whenVisible(by.id('email'), email => email.sendKeys('test@test.com'));
        await element(by.id('password')).sendKeys('test');
        await element(by.buttonText('Sign in')).click();

        // Look for order
        let fullName = `${firstName} ${lastName}`;
        let orderSummary = await whenAnyVisible(by.className('order-summary'), orderSummaries =>
            orderSummaries.filter(async (summary: ElementFinder) => await summary.element(by.className('name')).getText() === fullName).first());

        // Test order summary as expected
        expect(await orderSummary.element(by.className('status')).getText()).to.equal('Outstanding');
        expect(await orderSummary.element(by.className('address')).getText()).to.equal('1 The Street, Foo Town, CR7 2GB');
        expect(await orderSummary.element(by.className('total-payment')).getText()).to.equal('£22.41 (VISA)');

        // Test order details are visible as expected
        let orderId = await orderSummary.getAttribute('id');
        let orderDetails = element(by.id(`details_${orderId}`));
        expect(await orderDetails.isDisplayed()).to.be.true;
        expect(await orderDetails.element(by.className('email')).getText()).to.equal('john-smith@test.com');
        expect(await orderDetails.element(by.className('payment-reference')).getText()).to.not.equal('');
        expect(await orderDetails.element(by.className('order-notes')).getText()).to.equal('Some test order notes');
        let orderItems = await element.all(by.css(`#details_${orderId} .order-item`));
        expect(await orderItems[0].element(by.className('name')).getText()).to.equal('Neapolitan Pizza - large');
        expect(await orderItems[0].element(by.className('quantity')).getText()).to.equal('1');
        expect(await orderItems[0].element(by.className('price')).getText()).to.equal('£16.99');


        // Test collapse button
        await orderSummary.element(by.buttonText('Collapse')).click();
        expect(await orderDetails.isPresent()).to.be.false;

        // Test expand button
        await orderSummary.element(by.buttonText('Expand')).click();
        expect(await orderDetails.isDisplayed()).to.be.true;
    });
});

async function addProduct(name: string) {
    let pizza = await whenAnyVisible(by.className('product'), async products => {
        return products.filter(async (x: ElementFinder) => await x.element(by.tagName('h3')).getText() === name).first();
    });
    await pizza.element(by.className('btn-primary')).click();
}

function getRandomString() {
    return randomBytes(4).toString('hex');
}

// Legacy PayPal checkout method
// await whenVisible(by.id('login_email'), email => email.sendKeys('csharpandsons-buyer@gmail.com'))
// await element(by.id('login_password')).sendKeys('test&test');
// await element(by.id('submitLogin')).click();
// await whenVisibleAndNotMoving(by.id('continue'), payNow => payNow.click());