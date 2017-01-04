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
import { GuardService } from './service/guard.service';
import { OrderFailureComponent } from './notification.component/order-failure.component';
import { HeaderComponent } from './header.component/header.component'
import { CheckoutGuard } from './guards/checkout.guard';
import { PaymentGuard } from './guards/payment.guard';
import { PaymentProcessGuard } from './guards/payment-process.guard';
import {OrdersComponent} from './admin/orders.component'
import { Routes } from '@angular/router';

export default [
    { path: 'pizza', component: PizzaComponent, data: {isAdmin: true} },
    { path: 'sides', component: SidesComponent },
    { path: 'drinks', component: DrinksComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'checkout', canActivate: [CheckoutGuard], component: CheckoutComponent },
    { path: 'payment', canActivate: [PaymentGuard], component: PaymentComponent },
    { path: 'payment/process', canActivate: [PaymentProcessGuard], component: PaymentProcess },
    { path: 'order/success', component: OrderSuccessComponent },
    { path: 'order/failure', component: OrderFailureComponent },
    { path: 'admin/get-orders', component: OrdersComponent },
    { path: '', redirectTo: 'pizza', pathMatch: 'full' }
] as Routes;