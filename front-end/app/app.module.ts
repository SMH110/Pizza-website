import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { PizzaComponent } from './pizza.component';
import { SidesComponent } from './sides.component';
import { DrinksComponent } from './drinks.component';
import { AboutUsComponent } from './about-us.component';
import { BasketComponent } from './basket.component';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot([
    { path: 'pizza', component: PizzaComponent },
    { path: 'sides', component: SidesComponent },
    { path: 'drinks', component: DrinksComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'basket', component: BasketComponent },
    { path: '', redirectTo: 'pizza', pathMatch: 'full' }

  ])],
  declarations: [
    AppComponent,
    HeaderComponent,
    PizzaComponent,
    SidesComponent,
    DrinksComponent,
    AboutUsComponent,
    BasketComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
