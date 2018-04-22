import { expect } from 'chai';
import { TestSetup } from "./test-setup";
import { PizzasPage } from "./page-objects/pizzas.page";
import { BasketPage } from "./page-objects/basket.page";
import { CheckoutPage } from "./page-objects/checkout.page";
import { EPDQPage } from "./page-objects/epdq.page";
import { OrderSuccessPage } from "./page-objects/order-success.page";
import { AdminSignInPage } from "./page-objects/admin-sign-in.page";
import { OrdersPage } from "./page-objects/orders.page";

describe("EPDQ e2e test", () => {
    let firstName: string, lastName: string;

    beforeEach(async () => {
        await TestSetup.beforeEach();
        firstName = `John ${TestSetup.getRandomString()}`
        lastName = `Smith`
    });

    afterEach(async () => {
        await TestSetup.deleteOrderFor(firstName);
    });

    it("I can add a pizza to the basket and check out using Barclays ePDQ", async () => {
        await PizzasPage.addPizza('Spinaci', 'Extra Large');

        await BasketPage.navigate();
        await BasketPage.checkout();

        // Enter personal details and continue
        await CheckoutPage.enterPersonalDetails({
            firstName,
            lastName,
            email: 'john-smith@test.com',
            phone: '01234567890'
        });
        await CheckoutPage.enterOrderNotes('Some test EPDQ order notes');
        await CheckoutPage.selectDeliveryMethod('Delivery');
        await CheckoutPage.selectPaymentMethod('Credit / Debit Card');
        await CheckoutPage.enterDeliveryAddress({
            line1: '1 The Street',
            town: 'Foo Town',
            postcode: 'CR7 2GB'
        });
        await CheckoutPage.enterBillingAddress({
            line1: '2 The Road',
            town: 'Some Town',
            postcode: 'AB1 2CD'
        });
        await CheckoutPage.placeOrder();

        await EPDQPage.pay();

        await OrderSuccessPage.isEventuallyDisplayed();

        await AdminSignInPage.navigate();
        await AdminSignInPage.signIn();

        let orderSummary = await OrdersPage.getOrderByName(firstName, lastName);
        expect(await orderSummary.getStatus()).to.equal('Outstanding');
        expect(await orderSummary.getAddress()).to.equal('1 The Street, Foo Town, CR7 2GB');
        expect(await orderSummary.getPhone()).to.equal('01234567890');
        expect(await orderSummary.getTotalPayment()).to.equal('£15.49 (Credit / Debit Card)');

        let orderDetails = await orderSummary.getOrderDetails();
        expect(await orderDetails.isDisplayed()).to.be.true;
        expect(await orderDetails.email.getText()).to.equal('john-smith@test.com');
        expect(await orderDetails.paymentReference.getText()).to.not.equal('')
        expect(await orderDetails.orderNotes.getText()).to.equal('Some test EPDQ order notes');
        expect(await orderDetails.orderTotal.isPresent()).to.be.false;
        expect(await orderDetails.discount.isPresent()).to.be.false;
        expect(await orderDetails.totalPayable.getText()).to.equal('£15.49');

        let orderItems = await orderDetails.getOrderItems();
        expect(await orderItems[0].name.getText()).to.equal('Spinaci - Extra Large');
        expect(await orderItems[0].quantity.getText()).to.equal('1');
        expect(await orderItems[0].price.getText()).to.equal('£14.99');

        await orderSummary.toggleExpanded();
        expect(await orderDetails.isPresent()).to.be.false;

        await orderSummary.toggleExpanded();
        expect(await orderDetails.isDisplayed()).to.be.true;
    });
});
