import { PizzaComponent } from "./items/pizza/pizza.component";
import { SidesComponent } from "./items/sides/sides.component";
import { DrinksComponent } from "./items/drinks/drinks.component";
import { AboutUsComponent } from "./footer/about-us.component";
import { TermsAndConditionsComponent } from "./footer/terms-and-conditions.component";
import { ContactUsComponent } from "./footer/contact-us.component";
import { BasketComponent } from "./basket/basket.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { OrderSuccessComponent } from "./notification/order-success.component";
import { OrderFailureComponent } from "./notification/order-failure.component";
import { CheckoutGuard } from "./guards/checkout.guard";
import { OrdersComponent } from "./admin/orders/orders.component";
import { CustomersComponent } from "./admin/customers/customers.component";
import { SignInComponent } from "./admin/sign-in/sign-in.component";
import { CheckDeliveryAreaComponent } from "./checking-delivery-area/check-delivery-area.component";
import { CalzoneComponent } from "./items/calzone/calzone.component";
import { PastaComponent } from "./items/pasta/pasta.component";
import { SaladsComponent } from "./items/salads/salads.component";
import { DessertsComponent } from "./items/desserts/desserts.component";
import { IceCreamComponent } from "./items/ice-cream/ice-cream.component";
import { SpecialOffersComponent } from "./special-offers/special-offers.component";

import { Routes } from "@angular/router";
import { ReportingComponent } from "./admin/reporting/reporting.component";

export default [
  { path: "pizza", component: PizzaComponent },
  { path: "calzone", component: CalzoneComponent },
  { path: "pasta", component: PastaComponent },
  { path: "sides", component: SidesComponent },
  { path: "salads", component: SaladsComponent },
  { path: "desserts", component: DessertsComponent },
  { path: "ice-cream", component: IceCreamComponent },
  { path: "drinks", component: DrinksComponent },
  { path: "delivery-areas", component: CheckDeliveryAreaComponent },
  { path: "special-offers", component: SpecialOffersComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "terms-and-conditions", component: TermsAndConditionsComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "basket", component: BasketComponent },
  {
    path: "checkout",
    canActivate: [CheckoutGuard],
    component: CheckoutComponent
  },
  { path: "order/success", component: OrderSuccessComponent },
  { path: "order/failure", component: OrderFailureComponent },
  { path: "admin/customers", component: CustomersComponent },
  { path: "admin/reporting", component: ReportingComponent },
  { path: "admin/orders", component: OrdersComponent },
  { path: "admin/sign-in", component: SignInComponent },
  { path: "", redirectTo: "pizza", pathMatch: "full" }
] as Routes;
