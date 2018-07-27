import { expect } from "chai";
import { TestSetup } from "./test-setup";
import { PizzasPage } from "./page-objects/pizzas.page";
import { SidesPage } from "./page-objects/sides.page";
import { DrinksPage } from "./page-objects/drinks.page";
import { BasketPage } from "./page-objects/basket.page";
import { CheckoutPage } from "./page-objects/checkout.page";
import { PayPalPage } from "./page-objects/paypal.page";
import { OrderSuccessPage } from "./page-objects/order-success.page";
import { AdminSignInPage } from "./page-objects/admin-sign-in.page";
import { OrdersPage } from "./page-objects/orders.page";

describe("PayPal", () => {
  let firstName: string, lastName: string;

  beforeEach(async () => {
    await TestSetup.beforeEach();
    firstName = `John ${TestSetup.getRandomString()}`;
    lastName = `Smith`;
  });

  afterEach(async () => {
    await TestSetup.deleteOrderFor(firstName);
  });

  it("I can add 3 pizzas, a side and a drink to the basket and check out using PayPal", async () => {
    await PizzasPage.addPizza("Margherita", "Medium");
    await PizzasPage.addPizza("Margherita", "Medium");
    await PizzasPage.addPizza("Margherita", "Medium");

    await SidesPage.navigate();
    await SidesPage.addProduct("Garlic Bread");

    await DrinksPage.navigate();
    await DrinksPage.addProduct("Bottle of Water");

    await BasketPage.navigate();
    await BasketPage.checkout();

    // Enter personal details and continue
    await CheckoutPage.enterPersonalDetails({
      firstName,
      lastName,
      email: "john-smith@test.com",
      phone: "01234567890"
    });
    await CheckoutPage.enterOrderNotes("Some test PayPal order notes");
    await CheckoutPage.selectDeliveryMethod("Delivery");
    await CheckoutPage.selectPaymentMethod("PayPal");
    await CheckoutPage.enterDeliveryAddress({
      line1: "1 The Street",
      line2: "Some Road",
      town: "Foo Town",
      postcode: "CR7 2GB"
    });
    await CheckoutPage.placeOrder();

    await PayPalPage.pay();

    await OrderSuccessPage.isEventuallyDisplayed();

    await AdminSignInPage.navigate();
    await AdminSignInPage.signIn();

    let orderSummary = await OrdersPage.getOrderByName(firstName, lastName);
    expect(await orderSummary.getStatus()).to.equal("Outstanding");
    expect(await orderSummary.getAddress()).to.equal(
      "1 The Street, Some Road, Foo Town, CR7 2GB"
    );
    expect(await orderSummary.getPhone()).to.equal("01234567890");
    expect(await orderSummary.getTotalPayment()).to.equal("£20.96 (PayPal)");

    let orderDetails = await orderSummary.getOrderDetails();
    expect(await orderDetails.isDisplayed()).to.be.true;
    expect(await orderDetails.email.getText()).to.equal("john-smith@test.com");
    expect(await orderDetails.paymentReference.getText()).to.not.equal("");
    expect(await orderDetails.orderNotes.getText()).to.equal(
      "Some test PayPal order notes"
    );
    expect(await orderDetails.orderTotal.getText()).to.equal("£26.20");
    expect(await orderDetails.discount.getText()).to.equal("£5.24");
    expect(await orderDetails.totalPayable.getText()).to.equal("£20.96");

    let orderItems = await orderDetails.getOrderItems();
    expect(await orderItems[0].name.getText()).to.equal("Margherita - Medium");
    expect(await orderItems[0].quantity.getText()).to.equal("3");
    expect(await orderItems[0].price.getText()).to.equal("£7.50");
    expect(await orderItems[1].name.getText()).to.equal(
      "Garlic Bread - Only garlic"
    );
    expect(await orderItems[1].quantity.getText()).to.equal("1");
    expect(await orderItems[1].price.getText()).to.equal("£3.00");
    expect(await orderItems[2].name.getText()).to.equal("Bottle of Water");
    expect(await orderItems[2].quantity.getText()).to.equal("1");
    expect(await orderItems[2].price.getText()).to.equal("£0.70");

    await orderSummary.toggleExpanded();
    expect(await orderDetails.isPresent()).to.be.false;

    await orderSummary.toggleExpanded();
    expect(await orderDetails.isDisplayed()).to.be.true;
  });
});
