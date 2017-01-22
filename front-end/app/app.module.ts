import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PizzaComponent } from './pizza.component';
import { SidesComponent } from './sides.component';
import { DrinksComponent } from './drinks.component';
import { AboutUsComponent } from './about-us.component';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { ContactUsComponent } from './contact-us.component';
import { BasketComponent } from './basket.component';
import { FooterComponent } from './footer.component';
import { JumbotronComponent } from './jumbotron.component';
import { CheckoutComponent } from './checkout.component/checkout.component';
import { PaymentComponent } from './checkout.component/payment.component';
import { OrderSuccessComponent } from './notification.component/order-success.component';
import { OrderFailureComponent } from './notification.component/order-failure.component';
import { HeaderComponent } from './header.component/header.component';
import { OrdersComponent } from './admin/orders.component';
import { SignInComponent } from './admin/sign-in.component';
import { AdminFailureComponent } from './admin/admin-failure.component';
//services
import { BuyerDetailsService } from './service/buyer-details.service';
import { BasketService } from './service/basket.service';
import { GuardService } from './service/guard.service';
import { OrderService } from './service/order.service';
import { SignInService } from './service/sign-in.service'
// Guards
import { CheckoutGuard } from './guards/checkout.guard';
import { PaymentGuard } from './guards/payment.guard';
import Routes from './routes';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(Routes)],
  declarations: [
    AppComponent,
    PizzaComponent,
    SidesComponent,
    DrinksComponent,
    AboutUsComponent,
    BasketComponent,
    FooterComponent,
    TermsAndConditionsComponent,
    ContactUsComponent,
    JumbotronComponent,
    CheckoutComponent,
    PaymentComponent,
    OrderSuccessComponent,
    OrderFailureComponent,
    HeaderComponent,
    OrdersComponent,
    SignInComponent,
    AdminFailureComponent
  ],
  providers:
  [
    OrderService,
    BasketService,
    GuardService,
    CheckoutGuard,
    PaymentGuard,
    SignInService,
    BuyerDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
