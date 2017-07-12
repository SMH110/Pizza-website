import { whenAnyVisible } from "../protractor-utils";
import { by, element, ElementFinder } from "protractor";

class OrdersPageObject {
    async getOrderByName(firstName: string, lastName: string) {
        let fullName = `${firstName} ${lastName}`;
        console.log(`Getting order for ${fullName}`);
        let orderSummary = await whenAnyVisible(by.className('order-summary'),
            // TODO - Remove the any cast here
            orderSummaries => orderSummaries.filter((async (summary: ElementFinder) => await summary.element(by.className('name')).getText() === fullName) as any).first());
        return new OrderSummaryObject(orderSummary);
    }
}

export const OrdersPage = new OrdersPageObject();

class OrderSummaryObject {
    constructor(private elementFinder: ElementFinder) {
    }

    getStatus() {
        console.log('Getting Order Summary status');
        return this.elementFinder.element(by.className('status')).getText();
    }

    getAddress() {
        console.log('Getting Order Summary address');
        return this.elementFinder.element(by.className('address')).getText();
    }

    getPhone() {
        console.log('Getting Order Summary phone');
        return this.elementFinder.element(by.className('phone')).getText();
    }

    getTotalPayment() {
        console.log('Getting Order Summary total payment');
        return this.elementFinder.element(by.className('total-payment')).getText();
    }

    async getOrderDetails() {
        console.log('Getting Order Summary order details');
        let orderId = await this.elementFinder.getAttribute('id');
        return new OrderDetailsObject(orderId);
    }

    async toggleExpanded() {
        console.log('Toggling Order Summary');
        await this.elementFinder.element(by.className('toggle-expanded')).click();
    }
}

class OrderDetailsObject {
    constructor(private orderId: string) {
    }

    private get elementFinder() {
        return element(by.id(`details_${this.orderId}`));
    }

    isDisplayed() {
        console.log('Getting Order Details isDisplayed');
        return this.elementFinder.isDisplayed();
    }

    isPresent() {
        console.log('Getting Order Details isPresent');
        return this.elementFinder.isPresent();
    }

    get email() {
        console.log('Getting Order Details email');
        return this.elementFinder.element(by.className('email'));
    }

    get paymentReference() {
        console.log('Getting Order Details payment reference');
        return this.elementFinder.element(by.className('payment-reference'));
    }

    get orderNotes() {
        console.log('Getting Order Details order notes');
        return this.elementFinder.element(by.className('order-notes'));
    }

    get orderTotal() {
        console.log('Getting Order Details order total');
        return this.elementFinder.element(by.className('order-total'));
    }

    get discount() {
        console.log('Getting Order Details discount');
        return this.elementFinder.element(by.className('discount'));
    }

    get totalPayable() {
        console.log('Getting Order Details total payable');
        return this.elementFinder.element(by.className('total-payable'));
    }

    async getOrderItems() {
        console.log('Getting Order Details order items');
        let orderItems = await element.all(by.css(`#details_${this.orderId} .order-item`));
        return orderItems.map(x => new OrderItemObject(x));
    }
}

class OrderItemObject {
    constructor(private elementFinder: ElementFinder) {
    }

    get name() {
        console.log('Getting Order Item name');
        return this.elementFinder.element(by.className('name'));
    }

    get quantity() {
        console.log('Getting Order Item quantity');
        return this.elementFinder.element(by.className('quantity'));
    }

    get price() {
        console.log('Getting Order Item price');
        return this.elementFinder.element(by.className('price'));
    }
}
