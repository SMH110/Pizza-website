import { browser, element, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from "protractor";
import { By } from "selenium-webdriver";

export const UI_READY_TIMEOUT = 15000;
export const URL_CHANGE_TIMEOUT = 20000;

export async function urlShouldBecome(predicate: (url: string) => boolean) {
    console.log('Waiting for URL to match', predicate.toString());
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
    console.log('Waiting for visibility of element');
    await browser.wait(EC.visibilityOf(theElement), UI_READY_TIMEOUT);
    console.log('Element is now visible');
    if (action !== undefined) {
        console.log('whenVisible - Performing an action');
        let result = await action(theElement);
        console.log('whenVisible - Successfully performed action');
        return result;
    } else {
        return theElement;
    }
}

export async function whenVisibleAndNotMoving(locator: By): Promise<ElementFinder>;
export async function whenVisibleAndNotMoving<T>(locator: By, action: (element: ElementFinder) => T): Promise<T>;
export async function whenVisibleAndNotMoving<T>(locator: By, action?: (element: ElementFinder) => T): Promise<T | ElementFinder> {
    console.log('whenVisibleAndNotMoving called');
    return whenVisible(locator, async element => {
        console.log('whenVisibleAndNotMoving - Element visible... waiting for element to stop moving');
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
        console.log('whenVisibleAndNotMoving - Element has stopped moving');
        if (action !== undefined) {
            console.log('whenVisibleAndNotMoving - Performing an action...');
            let result = await action(element);
            console.log('whenVisibleAndNotMoving - Successfully performed action');
            return result;
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
    console.log('Waiting for Angular to be available...');
    await browser.wait(async () => await browser.executeScript("return window.getAngularTestability !== undefined;"), URL_CHANGE_TIMEOUT);
    console.log('Angular is available');
}

export async function doInsideIFrame<T>(locator: By, action: () => T) {
    console.log('Waiting for iframe to appear');
    await browser.driver.wait(async () => (await browser.driver.findElements(locator)).length > 0, UI_READY_TIMEOUT);
    console.log('iframe is present. Switching into iframe...');
    await browser.switchTo().frame(await browser.driver.findElement(locator));
    console.log('Successfully switched to iframe...');
    try {
        console.log('Performing action inside iframe...');
        await action();
        console.log('Successfully performed action inside iframe');
    } finally {
        console.log('Switching back out of iframe...');
        browser.switchTo().defaultContent();
        console.log('Successfully switched back out of iframe');
    }
}
