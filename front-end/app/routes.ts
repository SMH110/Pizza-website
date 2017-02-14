import { PizzaComponent } from './items/pizza.component';
import { SidesComponent } from './items/sides.component';
import { DrinksComponent } from './items/drinks.component';
import { AboutUsComponent } from './footer/about-us.component';
import { TermsAndConditionsComponent } from './footer/terms-and-conditions.component';
import { ContactUsComponent } from './footer/contact-us.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './notification/order-success.component';
import { OrderFailureComponent } from './notification/order-failure.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { OrdersComponent } from './admin/orders.component';
import { SignInComponent } from './admin/sign-in.component';
import { CheckDeliveryAreaComponent } from './checking-delivery-area/check-delivery-area.component';
import { CalzoneComponent } from './items/calzone/calzone.component';
import { PastaComponent } from './items/pasta/pasta.component';
import { SaladsComponent } from './items/salads/salads.component';
import { DessertsComponent } from './items/desserts/desserts.component';


import { Routes } from '@angular/router';

export default [
    { path: 'pizza', component: PizzaComponent },
    { path: 'calzone', component: CalzoneComponent },
    { path: 'pasta', component: PastaComponent },
    { path: 'sides', component: SidesComponent },
    { path: 'salads', component: SaladsComponent },
    { path: 'desserts', component: DessertsComponent },
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
