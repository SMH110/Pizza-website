import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Header } from './header.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, Header],
  bootstrap: [AppComponent]
})
export class AppModule { }
