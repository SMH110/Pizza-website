import { browser, by, element, ElementFinder, ExpectedConditions as EC } from "protractor";
import {  urlShouldBecome,  whenAnyVisible, whenVisible, waitForAngularToLoad, UI_READY_TIMEOUT, addPizza,  getRandomString } from './utils';
import { expect } from 'chai';

describe("ePDQ TEST", () => {
    beforeEach(async () => {
        await browser.restart();
        browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().setSize(1280, 1024);
    });

    it("I can add a pizza to the basket and check out using Barclays ePDQ", async () => {
        await browser.get('/');

        // Add a pizza
        await addPizza('Spinaci', 'Extra Large');

        // Go to the basket and checkout
        await element(by.partialLinkText('Basket')).click();
        await whenVisible(by.className('next'), nextButton => nextButton.click());

        // Enter personal details and continue
        let firstName = 'John ' + getRandomString();
        let lastName = 'Smith';
        await whenVisible(by.name('firstName'), firstNameInput => firstNameInput.sendKeys(firstName));
        await element(by.name('lastName')).sendKeys(lastName);
        await element(by.name('email')).sendKeys('john-smith@test.com');
        await element(by.name('phone')).sendKeys('01234567890');
        await element(by.name('order_notes')).sendKeys('Some test order notes');
        await element(by.buttonText('Delivery')).click();
        // Select EPDQ
        await element(by.buttonText('Credit / Debit Card')).click();

        // Enter Delivery address
        await element(by.name('delivery_address1')).sendKeys('1 The Street');
        await element(by.name('delivery_town')).sendKeys('Foo Town');
        await element(by.name('delivery_postcode')).sendKeys('CR7 2GB');

        await element(by.name('billing_address1')).sendKeys('2 The Road');
        await element(by.name('billing_town')).sendKeys('Some Town');
        await element(by.name('billing_postcode')).sendKeys('AB1 2CD');
        // place the order.
        await element(by.buttonText('Continue to payment')).click();

        // Wait for EPDQ to load
        await urlShouldBecome(url => /mdepayments\.epdq\.co\.uk/.test(url));

        await whenVisible(by.name('VISA_brand'), VisaBrand => VisaBrand.click());
        await whenVisible(by.id('Ecom_Payment_Card_Number'), CardNumber => CardNumber.sendKeys('4111111111111111'));
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
        await whenVisible(by.name('username'), email => email.sendKeys('admin'));
        await element(by.name('password')).sendKeys('test');
        await element(by.buttonText('Sign in')).click();

        // Look for order
        let fullName = `${firstName} ${lastName}`;
        let orderSummary = await whenAnyVisible(by.className('order-summary'), orderSummaries =>
            orderSummaries.filter(async (summary: ElementFinder) => await summary.element(by.className('name')).getText() === fullName).first());

        // Test order summary as expected
        expect(await orderSummary.element(by.className('status')).getText()).to.equal('Outstanding');
        expect(await orderSummary.element(by.className('address')).getText()).to.equal('1 The Street, Foo Town, CR7 2GB');
        expect(await orderSummary.element(by.className('phone')).getText()).to.equal('01234567890');
        expect(await orderSummary.element(by.className('total-payment')).getText()).to.equal('£15.49 (Credit / Debit Card)');

        // Test order details are visible as expected
        let orderId = await orderSummary.getAttribute('id');
        let orderDetails = element(by.id(`details_${orderId}`));
        expect(await orderDetails.isDisplayed()).to.be.true;
        expect(await orderDetails.element(by.className('email')).getText()).to.equal('john-smith@test.com');
        expect(await orderDetails.element(by.className('payment-reference')).getText()).to.not.equal('');
        expect(await orderDetails.element(by.className('order-notes')).getText()).to.equal('Some test order notes');
        expect(await orderDetails.element(by.className('order-total')).isPresent()).to.be.false;
        expect(await orderDetails.element(by.className('discount')).isPresent()).to.be.false;
        expect(await orderDetails.element(by.className('total-payable')).getText()).to.equal('£15.49');
        let orderItems = await element.all(by.css(`#details_${orderId} .order-item`));
        expect(await orderItems[0].element(by.className('name')).getText()).to.equal('Spinaci - Extra Large');
        expect(await orderItems[0].element(by.className('quantity')).getText()).to.equal('1');
        expect(await orderItems[0].element(by.className('price')).getText()).to.equal('£14.99');
        expect(await orderItems[1].element(by.className('name')).getText()).to.equal('Credit / Debit card fee');
        expect(await orderItems[1].element(by.className('quantity')).getText()).to.equal('1');
        expect(await orderItems[1].element(by.className('price')).getText()).to.equal('£0.50');

        // Test collapse button
        await orderSummary.element(by.buttonText('Collapse')).click();
        expect(await orderDetails.isPresent()).to.be.false;

        // Test expand button
        await orderSummary.element(by.buttonText('Expand')).click();
        expect(await orderDetails.isDisplayed()).to.be.true;
    });
});
