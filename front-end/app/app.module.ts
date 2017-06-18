import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { PizzaComponent } from './items/pizza/pizza.component';
import { SidesComponent } from './items/sides/sides.component';
import { AddPizzaModalComponent } from './add-pizza-modal/add-pizza-modal.component';
import { DrinksComponent } from './items/drinks/drinks.component';
import { ItemComponent } from './items/item/item.component';
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
import { CalzoneComponent } from './items/calzone/calzone.component';
import { PastaComponent } from './items/pasta/pasta.component';
import { SaladsComponent } from './items/salads/salads.component';
import { DessertsComponent } from './items/desserts/desserts.component';
import { ClearBasketModalComponent } from './clear-basket-modal/clear-basket-modal.component';
import { IceCreamComponent } from './items/ice-cream/ice-cream.component';
import { PotatoSkinsModalComponent } from './potato-skins-modal/potato-skins-modal.component';
import { ConfirmOrderModalComponent } from './confirm-order-modal/confirm-order-modal.component';
import { SpecialOffersComponent } from "./special-offers/special-offers.component";

// Services
import { ErrorService } from './service/error.service';
import { BasketService } from './service/basket.service';
import { OrderService } from './service/order.service';
import { SignInService } from './service/sign-in.service';
import { NotificationService } from './service/notification.service';
import { ModalService } from './service/modal.service';
import { UserDetailsService } from './service/user-details.service';
// Guards
import { CheckoutGuard } from './guards/checkout.guard';

import ErrorReporter from './error-reporter';

import Routes from './routes';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

export const AppModuleDeclaration = {
    imports: [RouterModule.forRoot(Routes), BrowserModule, HttpModule, FormsModule, Ng2Bs3ModalModule],
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
        SpecialOffersComponent,
        NotificationsComponent,
        ItemComponent,
        AddPizzaModalComponent,
        ModalHostComponent,
        CalzoneComponent,
        PastaComponent,
        SaladsComponent,
        DessertsComponent,
        IceCreamComponent,
        ClearBasketModalComponent,
        PotatoSkinsModalComponent,
        ConfirmOrderModalComponent
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
        UserDetailsService,

        // Guards
        CheckoutGuard,

        // Global error handler
        { provide: ErrorHandler, useClass: ErrorReporter }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        AddPizzaModalComponent,
        PotatoSkinsModalComponent,
        ClearBasketModalComponent,
        ConfirmOrderModalComponent
    ]
};

@NgModule(AppModuleDeclaration)
export class AppModule { }
