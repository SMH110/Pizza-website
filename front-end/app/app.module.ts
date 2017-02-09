import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { PizzaComponent } from './items/pizza.component';
import { SidesComponent } from './items/sides.component';
import { AddPizzaModalComponent } from './add-pizza-modal/add-pizza-modal.component';
import { DrinksComponent } from './items/drinks.component';
import { ItemComponent } from './items/item.component';
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
import { OrdersComponent } from './admin/orders.component';
import { SignInComponent } from './admin/sign-in.component';
import { NotificationsComponent } from './notification/notifications.component';
import { ModalHostComponent } from './modal-host/modal-host.component';

// Services
import { ErrorService } from './service/error.service';
import { BasketService } from './service/basket.service';
import { OrderService } from './service/order.service';
import { SignInService } from './service/sign-in.service';
import { NotificationService } from './service/notification.service';
import { ModalService } from './service/modal.service';

// Guards
import { CheckoutGuard } from './guards/checkout.guard';

import ErrorReporter from './error-reporter';

import Routes from './routes';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import 'jquery';
import 'bootstrap';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(Routes), Ng2Bs3ModalModule],
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
    OrdersComponent,
    SignInComponent,
    NotificationsComponent,
    ItemComponent,
    AddPizzaModalComponent,
    ModalHostComponent
  ],
  providers:
  [
    // Services
    OrderService,
    ErrorService,
    BasketService,
    SignInService,
    NotificationService,
    ModalService,

    // Guards
    CheckoutGuard,

    // Global error handler
    { provide: ErrorHandler, useClass: ErrorReporter }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPizzaModalComponent
  ]
})
export class AppModule { }
