import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { PizzaComponent } from './items/pizza.component';
import { SidesComponent } from './items/sides.component';
import { DrinksComponent } from './items/drinks.component';
import { CheckDeliveryAreaComponent } from './checking-delivery-area/check-delivery-area.component'
import { AboutUsComponent } from './footer/about-us.component';
import { TermsAndConditionsComponent } from './footer/terms-and-conditions.component';
import { ContactUsComponent } from './footer/contact-us.component';
import { BasketComponent } from './basket/basket.component';
import { FooterComponent } from './footer/footer.component';
import { JumbotronComponent } from './header/jumbotron.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './notification/order-success.component';
import { OrderFailureComponent } from './notification/order-failure.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { OrdersComponent } from './admin/orders.component';
import { SignInComponent } from './admin/sign-in.component';
import { ItemAddedNotificationComponent } from './notification/item-added-notification.component';
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
