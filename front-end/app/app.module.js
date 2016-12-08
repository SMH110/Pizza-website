"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var header_component_1 = require('./header.component');
var pizza_component_1 = require('./pizza.component');
var sides_component_1 = require('./sides.component');
var drinks_component_1 = require('./drinks.component');
var about_us_component_1 = require('./about-us.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, router_1.RouterModule.forRoot([
                    { path: 'pizza', component: pizza_component_1.PizzaComponent },
                    { path: 'sides', component: sides_component_1.SidesComponent },
                    { path: 'drinks', component: drinks_component_1.DrinksComponent },
                    { path: 'about-us', component: about_us_component_1.AboutUsComponent },
                    { path: '', redirectTo: 'pizza', pathMatch: 'full' }
                ])],
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                pizza_component_1.PizzaComponent,
                sides_component_1.SidesComponent,
                drinks_component_1.DrinksComponent,
                about_us_component_1.AboutUsComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map