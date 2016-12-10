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
var items_service_1 = require('./service/items.service');
var basket_service_1 = require('./service/basket.service');
var PizzaComponent = (function () {
    function PizzaComponent(itemService, basket) {
        this.itemService = itemService;
        this.basket = basket;
        this.selectedSize = "large";
    }
    PizzaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemService.getPizzas()
            .subscribe(function (x) {
            _this.pizzas = x;
            _this.pizzas.forEach(function (x) { return x.selectedSize = 'large'; });
        });
        this.totalQuantity = this.basket.totalQuantity;
    };
    PizzaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-pizza',
            templateUrl: "./pizza.component.html",
            styles: ["\n   .thumbnail img {\n    max-height: 160px;\n}\nselect {\n    margin-bottom: 15px;\n}\n"]
        }), 
        __metadata('design:paramtypes', [items_service_1.ItemService, basket_service_1.BasketService])
    ], PizzaComponent);
    return PizzaComponent;
}());
exports.PizzaComponent = PizzaComponent;
//# sourceMappingURL=pizza.component.js.map