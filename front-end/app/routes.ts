import { PizzaComponent } from './items.components/pizza.component';
import { SidesComponent } from './items.components/sides.component';
import { DrinksComponent } from './items.components/drinks.component';
import { AboutUsComponent } from './footer.components/about-us.component';
import { TermsAndConditionsComponent } from './footer.components/terms-and-conditions.component';
import { ContactUsComponent } from './footer.components/contact-us.component';
import { BasketComponent } from './basket.component/basket.component';
import { CheckoutComponent } from './checkout.component/checkout.component';
import { OrderSuccessComponent } from './notification.component/order-success.component';
import { OrderFailureComponent } from './notification.component/order-failure.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { OrdersComponent } from './admin/orders.component';
import { SignInComponent } from './admin/sign-in.component';
import { CheckDeliveryAreaComponent } from './checking-delivery-area.component/check-delivery-area.component'

import { Routes } from '@angular/router';

export default [
    { path: 'pizza', component: PizzaComponent },
    { path: 'sides', component: SidesComponent },
    { path: 'drinks', component: DrinksComponent },
    { path: 'delivery-areas', component: CheckDeliveryAreaComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'checkout', canActivate: [CheckoutGuard], component: CheckoutComponent },
    { path: 'order/success', component: OrderSuccessComponent },
    { path: 'order/failure', component: OrderFailureComponent },
    { path: 'admin/get-orders', component: OrdersComponent },
    { path: 'admin/sign-in', component: SignInComponent },
    { path: '', redirectTo: 'pizza', pathMatch: 'full' }
] as Routes;