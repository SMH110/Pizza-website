import { PizzaComponent } from './pizza.component';
import { SidesComponent } from './sides.component';
import { DrinksComponent } from './drinks.component';
import { AboutUsComponent } from './about-us.component';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { ContactUsComponent } from './contact-us.component';
import { BasketComponent } from './basket.component';
import { CheckoutComponent } from './checkout.component/checkout.component';
import { PaymentComponent } from './checkout.component/payment.component';
import { OrderSuccessComponent } from './notification.component/order-success.component';
import { OrderFailureComponent } from './notification.component/order-failure.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { PaymentGuard } from './guards/payment.guard';
import { OrdersComponent } from './admin/orders.component';
import { SignInComponent } from './admin/sign-in.component';
import { AdminFailureComponent } from './admin/admin-failure.component';


import { Routes } from '@angular/router';

export default [
    { path: 'pizza', component: PizzaComponent },
    { path: 'sides', component: SidesComponent },
    { path: 'drinks', component: DrinksComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'checkout', canActivate: [CheckoutGuard], component: CheckoutComponent },
    { path: 'payment', canActivate: [PaymentGuard], component: PaymentComponent },
    { path: 'order/success', component: OrderSuccessComponent },
    { path: 'order/failure', component: OrderFailureComponent },
    { path: 'admin/get-orders', component: OrdersComponent },
    { path: 'admin/sign-in', component: SignInComponent },
    { path: 'admin/failure', component: AdminFailureComponent },
    { path: '', redirectTo: 'pizza', pathMatch: 'full' }
] as Routes;