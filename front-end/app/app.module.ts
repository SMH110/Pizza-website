import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { PizzaComponent } from './pizza.component';
import { SidesComponent } from './sides.component';
import { DrinksComponent } from './drinks.component';
import { CheckDeliveryAreaComponent } from './checking-delivery-area.component/check-delivery-area.component'
import { AboutUsComponent } from './about-us.component';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { ContactUsComponent } from './contact-us.component';
import { BasketComponent } from './basket.component';
import { FooterComponent } from './footer.component';
import { JumbotronComponent } from './jumbotron.component';
import { CheckoutComponent } from './checkout.component/checkout.component';
import { OrderSuccessComponent } from './notification.component/order-success.component';
import { OrderFailureComponent } from './notification.component/order-failure.component';
import { HeaderComponent } from './header.component/header.component';
import { ErrorComponent } from './error/error.component';
import { OrdersComponent } from './admin/orders.component';
import { SignInComponent } from './admin/sign-in.component';
import { ItemAddedNotificationComponent } from './notification.component/item-added-notification.component';
// Services
import { ErrorService } from './service/error.service';
import { BasketService } from './service/basket.service';
import { OrderService } from './service/order.service';
import { SignInService } from './service/sign-in.service';
import { ItemNotificationService } from './service/item-notification.service';

// Guards
import { CheckoutGuard } from './guards/checkout.guard';

import ErrorReporter from './error-reporter';

import Routes from './routes';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(Routes)],
  declarations: [
    AppComponent,
    PizzaComponent,
    SidesComponent,
    CheckDeliveryAreaComponent,
    DrinksComponent,
    AboutUsComponent,
    BasketComponent,
    FooterComponent,
    TermsAndConditionsComponent,
    ContactUsComponent,
    JumbotronComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    OrderFailureComponent,
    HeaderComponent,
    ErrorComponent,
    OrdersComponent,
    SignInComponent,
    ItemAddedNotificationComponent
  ],
  providers:
  [
    // Services
    OrderService,
    ErrorService,
    BasketService,
    SignInService,
    ItemNotificationService,

    // Guards
    CheckoutGuard,

    // Global error handler
    { provide: ErrorHandler, useClass: ErrorReporter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
