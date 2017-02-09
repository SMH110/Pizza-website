import { browser, element, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from "protractor";
import { By } from "selenium-webdriver";
export const UI_READY_TIMEOUT = 15000;
export const URL_CHANGE_TIMEOUT = 20000;

export async function urlShouldBecome(predicate: (url: string) => boolean) {
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
    }
}

export async function whenVisible(locator: By): Promise<ElementFinder>;
export async function whenVisible<T>(locator: By, action: (element: ElementFinder) => T): Promise<T>;
export async function whenVisible<T>(locator: By, action?: (element: ElementFinder) => T): Promise<T | ElementFinder> {
    let theElement = element(locator);
    await browser.wait(EC.visibilityOf(theElement), UI_READY_TIMEOUT);
    if (action !== undefined) {
        return action(theElement);
    } else {
        return theElement;
    }
}

export async function whenVisibleAndNotMoving(locator: By): Promise<ElementFinder>;
export async function whenVisibleAndNotMoving<T>(locator: By, action: (element: ElementFinder) => T): Promise<T>;
export async function whenVisibleAndNotMoving<T>(locator: By, action?: (element: ElementFinder) => T): Promise<T | ElementFinder> {
    return whenVisible(locator, async element => {
        let previousLocation = await element.getLocation();
        let attempts = 0;
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 100));
            let currentLocation = await element.getLocation();
            if (currentLocation.x === previousLocation.x && currentLocation.y === previousLocation.y) {
                break;
            } else {
                previousLocation = currentLocation;
                if (attempts++ === 30) {
                    throw new Error("Element was moving for longer than 3 seconds" + locator.toString());
                }
            }
        }
        if (action !== undefined) {
            return action(element);
        } else {
            return element;
        }
    });
}

export async function whenClickable(locator: By): Promise<ElementFinder>;
export async function whenClickable<T>(locator: By, action: (element: ElementFinder) => T): Promise<T>;
export async function whenClickable<T>(locator: By, action?: (element: ElementFinder) => T): Promise<T | ElementFinder> {
    let theElement = element(locator);
    await browser.wait(EC.elementToBeClickable(theElement), UI_READY_TIMEOUT);
    if (action !== undefined) {
        return action(theElement);
    } else {
        return theElement;
    }
}

export async function whenAnyVisible(locator: By): Promise<ElementFinder[]>;
export async function whenAnyVisible<T>(locator: By, action: (element: ElementArrayFinder) => T): Promise<T>;
export async function whenAnyVisible<T>(locator: By, action?: (element: ElementArrayFinder) => T): Promise<T | ElementFinder[]> {
    await browser.wait(EC.visibilityOf(element(locator)), UI_READY_TIMEOUT);
    let elements = element.all(locator);
    if (action !== undefined) {
        return action(elements);
    } else {
        return elements;
    }
}

export async function whenNotPresent(locator: By): Promise<ElementFinder> {
    let theElement = element(locator);
    await browser.wait(EC.stalenessOf(theElement), UI_READY_TIMEOUT);
    return theElement;
}

export async function waitForAngularToLoad() {
    await browser.wait(async () => await browser.executeScript("return window.getAngularTestability !== undefined;"), URL_CHANGE_TIMEOUT);
}

export async function doInsideIFrame<T>(locator: By, action: () => T) {
    browser.switchTo().frame(browser.driver.findElement(locator));
    try {
        await action();
    } finally {
        browser.switchTo().defaultContent();
    }
}
