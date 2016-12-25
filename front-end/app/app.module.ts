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
import { PaymentProcess } from './checkout.component/payment-processing.component';
import { OrderSuccessComponent } from './notification.component/order-success.component';
import { OrderService } from './service/order.service';
import { BasketService } from './service/basket.service';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot([
    { path: 'pizza', component: PizzaComponent },
    { path: 'sides', component: SidesComponent },
    { path: 'drinks', component: DrinksComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'payment/process', component: PaymentProcess },
    { path: 'order/success', component: OrderSuccessComponent },
    { path: '', redirectTo: 'pizza', pathMatch: 'full' }

  ])],
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
    PaymentProcess,
    OrderSuccessComponent
  ],
  providers: [OrderService, BasketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
