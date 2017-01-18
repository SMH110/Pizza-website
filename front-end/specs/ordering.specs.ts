import { browser, by, element, ElementFinder } from "protractor";
import { urlShouldBecome, whenAnyVisible, whenVisible } from './utils';

describe("E2E Tests", () => {
    beforeEach(async () => {
        await browser.restart();
        await browser.driver.manage().window().setSize(1280, 1024);
    });

    it("I can add a pizza, side and drink to the basket and check out using PayPal", async () => {
        await browser.get('https://godfather-pizza-dev.herokuapp.com/');
        
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
        await element(by.id('address1')).sendKeys('1 The Street');
        await element(by.id('post-code')).sendKeys('AB1 2CD');
        await element(by.id('email')).sendKeys('test@test.com');
        await element(by.id('phone')).sendKeys('01234567890');
        await element(by.className('next')).click();

        // PayPal is selected by default. Place the order.
        await whenVisible(by.buttonText('Order Now'), orderButton => orderButton.click());

        // Wait for PayPal to load
        await urlShouldBecome(url => /sandbox\.paypal\.com/.test(url));
        browser.ignoreSynchronization = true;

        // Enter details and pay
        await whenVisible(by.id('login_email'), email => email.sendKeys('csharpandsons-buyer@gmail.com'))
        await element(by.id('login_password')).sendKeys('test&test');
        await element(by.id('submitLogin')).click();
        await whenVisible(by.id('continue'), payNow => payNow.click());

        // Ensure we are routed back to /order/success
        await urlShouldBecome(url => /\/order\/success/.test(url));
        browser.ignoreSynchronization = false;
    });
});

async function addProduct(name: string) {
    let pizza = await whenAnyVisible(by.className('product'), async products => {
        return products.filter(async (x: ElementFinder) => await x.element(by.tagName('h3')).getText() === name).first();
    });
    await pizza.element(by.className('btn-primary')).click();
}