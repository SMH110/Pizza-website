import { browser, element, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from "protractor";
import { By } from "selenium-webdriver";
const UI_READY_TIMEOUT = 10000;
const URL_CHANGE_TIMEOUT = 20000;

export async function urlShouldBecome(predicate: (url: string) => boolean) {
    browser.waitForAngularEnabled(false);
    let lastUrl;
    try {
        await browser.wait(async () => {
            let url = await browser.getCurrentUrl();
            lastUrl = url;
            return predicate(url);
        }, URL_CHANGE_TIMEOUT);
    } catch (e) {
        console.log(`urlShouldBecome failed. Last URL was ${lastUrl}. Looking for ${predicate.toString()}.`);
        throw e;
    } finally {
        browser.waitForAngularEnabled(true);
    }
}

export async function whenVisible<T>(locator: By, action: (element: ElementFinder) => T) {
    let theElement = element(locator);
    await browser.wait(EC.visibilityOf(theElement), UI_READY_TIMEOUT);
    return await action(theElement);
}

export async function whenAnyVisible<T>(locator: By, action: (element: ElementArrayFinder) => T) {
    await browser.wait(EC.visibilityOf(element(locator)), UI_READY_TIMEOUT);
    let elements = element.all(locator);
    return await action(elements);
}

export async function waitForAngularToLoad() {
    await browser.wait(async () => await browser.executeScript("return window.getAngularTestability !== undefined;"), URL_CHANGE_TIMEOUT);
}