import { browser, by, element, ElementFinder, ExpectedConditions as EC } from "protractor";
import { urlShouldBecome, getRandomString, whenAnyVisible, addProduct, whenVisible, waitForAngularToLoad, UI_READY_TIMEOUT } from './utils';
import { expect } from 'chai';

describe("CASH TEST", () => {
    beforeEach(async () => {
        await browser.restart();
        browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().setSize(1280, 1024);
    });
    
    it('I can add a side to the basket and check out using Cash', async () => {
        await browser.get("/");

        // Add a side
        await whenVisible(by.linkText("Sides"), sidesLink => sidesLink.click());
        await addProduct("Dips", "BBQ");

        //Go to the basket and checkout
        await element(by.partialLinkText("Basket")).click();
        await whenVisible(by.className("next"), nextButton => nextButton.click());

        // Enter personal details and continue
        let firstName = `John ${getRandomString()}`;
        let lastName = 'Smith';
        await whenVisible(by.name('firstName'), firstNameInput => firstNameInput.sendKeys(firstName));
        await element(by.name('lastName')).sendKeys(lastName);
        await element(by.name('email')).sendKeys('john-smith@test.com');
        await element(by.name('phone')).sendKeys('01234567890');
        await element(by.name('order_notes')).sendKeys('Cash order test notes');
        await element(by.buttonText('Collection')).click();
        // Select Cash
        await element(by.buttonText('Cash')).click();
        // Enter Delivery Address
        await element(by.name('delivery_address1')).sendKeys('1 The Street');
        await element(by.name('delivery_town')).sendKeys('Foo Town');
        await element(by.name('delivery_postcode')).sendKeys('CR7 2GB');

        // place the order.
        await element(by.buttonText('Place order')).click();

        // Ensure we are routed to /order/success
        await urlShouldBecome(url => /\/order\/success/.test(url));

        let orderSuccess = element(by.css(".order-success"));
        await browser.wait(EC.visibilityOf(orderSuccess), UI_READY_TIMEOUT);

        // Go to the Admin site
        await browser.get("/admin/sign-in");
        await waitForAngularToLoad();

        // Log into Admin site
        await whenVisible(by.name('username'), email => email.sendKeys('admin'));
        await element(by.name('password')).sendKeys('test');
        await element(by.buttonText('Sign in')).click();

        // Test order details are visible as expected
        let fullName = `${firstName} ${lastName}`;
        let orderSummary = await whenAnyVisible(by.className('order-summary'), orderSummaries =>
            orderSummaries.filter(async (summary: ElementFinder) => await summary.element(by.className('name')).getText() === fullName).first());

        // Test order summary as expected
        expect(await orderSummary.element(by.className('status')).getText()).to.equal('Outstanding');
        expect(await orderSummary.element(by.className('address')).getText()).to.equal('COLLECTION');
        expect(await orderSummary.element(by.className('phone')).getText()).to.equal('01234567890');
        expect(await orderSummary.element(by.className('total-payment')).getText()).to.equal('£0.50 (Cash)');

        // Test order details are visible as expected
        let orderId = await orderSummary.getAttribute('id');
        let orderDetails = element(by.id(`details_${orderId}`));
        expect(await orderDetails.isDisplayed()).to.be.true;
        expect(await orderDetails.element(by.className('email')).getText()).to.equal('john-smith@test.com');
        expect(await orderDetails.element(by.className('payment-reference')).isPresent()).to.be.false;
        expect(await orderDetails.element(by.className('order-notes')).getText()).to.equal('Cash order test notes');
        expect(await orderDetails.element(by.className('order-total')).isPresent()).to.be.false;
        expect(await orderDetails.element(by.className('discount')).isPresent()).to.be.false;
        expect(await orderDetails.element(by.className('total-payable')).getText()).to.equal('£0.50');
        let orderItems = await element.all(by.css(`#details_${orderId} .order-item`));
        expect(await orderItems[0].element(by.className('name')).getText()).to.equal('Dips - BBQ');
        expect(await orderItems[0].element(by.className('quantity')).getText()).to.equal('1');
        expect(await orderItems[0].element(by.className('price')).getText()).to.equal('£0.50');

        // Test collapse button
        await orderSummary.element(by.buttonText('Collapse')).click();
        expect(await orderDetails.isPresent()).to.be.false;

        // Test expand button
        await orderSummary.element(by.buttonText('Expand')).click();
        expect(await orderDetails.isDisplayed()).to.be.true;
    });
});





// Legacy PayPal checkout method
// await whenVisible(by.id('login_email'), email => email.sendKeys('csharpandsons-buyer@gmail.com'))
// await element(by.id('login_password')).sendKeys('test&test');
// await element(by.id('submitLogin')).click();
// await whenVisibleAndNotMoving(by.id('continue'), payNow => payNow.click());
