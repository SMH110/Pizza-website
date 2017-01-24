import { browser, by, element, ElementFinder, ExpectedConditions as EC } from "protractor";
import { urlShouldBecome, whenAnyVisible, whenVisible, waitForAngularToLoad } from './utils';

describe("E2E Tests", () => {
    beforeEach(async () => {
        await browser.restart();
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

        // PayPal is selected by default. Place the order.
        await element(by.buttonText('Order Now')).click();

        // Wait for PayPal to load
        await urlShouldBecome(url => /sandbox\.paypal\.com/.test(url));
        browser.waitForAngularEnabled(false);

        // Enter details and pay
        await whenVisible(by.id('login_email'), email => email.sendKeys('csharpandsons-buyer@gmail.com'))
        await element(by.id('login_password')).sendKeys('test&test');
        await element(by.id('submitLogin')).click();
        await whenVisible(by.id('continue'), payNow => payNow.click());

        // Ensure we are routed back to /order/success
        await urlShouldBecome(url => /\/order\/success/.test(url));
        await waitForAngularToLoad();
        browser.waitForAngularEnabled(true);

        let orderSuccess = element(by.css('.order-success'));
        await EC.visibilityOf(orderSuccess);
    });
});

async function addProduct(name: string) {
    let pizza = await whenAnyVisible(by.className('product'), async products => {
        return products.filter(async (x: ElementFinder) => await x.element(by.tagName('h3')).getText() === name).first();
    });
    await pizza.element(by.className('btn-primary')).click();
}