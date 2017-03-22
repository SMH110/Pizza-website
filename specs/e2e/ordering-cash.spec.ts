import { expect } from 'chai';
import { TestSetup } from "./test-setup";
import { SidesPage } from "./page-objects/sides.page";
import { BasketPage } from "./page-objects/basket.page";
import { CheckoutPage } from "./page-objects/checkout.page";
import { OrderSuccessPage } from "./page-objects/order-success.page";
import { AdminSignInPage } from "./page-objects/admin-sign-in.page";
import { OrdersPage } from "./page-objects/orders.page";

describe("CASH e2e test", () => {
    let firstName: string, lastName: string;

    beforeEach(async () => {
        await TestSetup.beforeEach();
        firstName = `John ${TestSetup.getRandomString()}`
        lastName = `Smith`
    });

    afterEach(async () => {
        await TestSetup.deleteOrderFor(firstName);
    });

    it('I can add a side to the basket and check out using Cash', async () => {
        await SidesPage.navigate();
        await SidesPage.addProduct("Dips", "BBQ");

        await BasketPage.navigate();
        await BasketPage.checkout();

        await CheckoutPage.enterPersonalDetails({
            firstName,
            lastName,
            email: 'john-smith@test.com',
            phone: '01234567890'
        });
        await CheckoutPage.enterOrderNotes('Some test cash order notes');
        await CheckoutPage.selectDeliveryMethod('Collection');
        await CheckoutPage.selectPaymentMethod('Cash');
        await CheckoutPage.enterDeliveryAddress({
            line1: 'Test Address Line 1',
            town: 'Test Town',
            postcode: 'SE27 9AZ'
        });
        await CheckoutPage.placeOrder();

        await OrderSuccessPage.isEventuallyDisplayed();

        await AdminSignInPage.navigate();
        await AdminSignInPage.signIn();

        let orderSummary = await OrdersPage.getOrderByName(firstName, lastName);
        expect(await orderSummary.getStatus()).to.equal('Outstanding');
        expect(await orderSummary.getAddress()).to.equal('COLLECTION');
        expect(await orderSummary.getPhone()).to.equal('01234567890');
        expect(await orderSummary.getTotalPayment()).to.equal('£0.50 (Cash)');

        let orderDetails = await orderSummary.getOrderDetails();
        expect(await orderDetails.isDisplayed()).to.be.true;
        expect(await orderDetails.email.getText()).to.equal('john-smith@test.com');
        expect(await orderDetails.paymentReference.isPresent()).to.be.false;
        expect(await orderDetails.orderNotes.getText()).to.equal('Some test cash order notes');
        expect(await orderDetails.orderTotal.isPresent()).to.be.false;
        expect(await orderDetails.discount.isPresent()).to.be.false;
        expect(await orderDetails.totalPayable.getText()).to.equal('£0.50');

        let orderItems = await orderDetails.getOrderItems();
        expect(await orderItems[0].name.getText()).to.equal('Dips - BBQ');
        expect(await orderItems[0].quantity.getText()).to.equal('1');
        expect(await orderItems[0].price.getText()).to.equal('£0.50');

        await orderSummary.toggleExpanded();
        expect(await orderDetails.isPresent()).to.be.false;

        await orderSummary.toggleExpanded();
        expect(await orderDetails.isDisplayed()).to.be.true;
    });
});
