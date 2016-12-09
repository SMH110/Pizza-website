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
var basket_service_1 = require('./service/basket.service');
var utils_1 = require('./utils');
var BasketComponent = (function () {
    function BasketComponent(basket) {
        this.basket = basket;
        this.items = [];
    }
    BasketComponent.prototype.ngOnInit = function () {
        this.items = this.basket.generateArray();
        this.totalPrice = Math.round(this.basket.totalPrice * 100) / 100;
        this.totalQuantity = this.basket.totalQuantity;
    };
    BasketComponent.prototype.buttonState = function (quantity) {
        return quantity < 2;
    };
    BasketComponent.prototype.increaseItem = function (item) {
        var storedItem = this.basket.items[item._id];
        if (!storedItem) {
            storedItem = { item: item, qty: 0, price: 0 };
            this.basket.items[item._id] = storedItem;
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.basket.totalPrice += storedItem.item.price;
        this.basket.totalQuantity++;
        this.totalQuantity = this.basket.totalQuantity;
        this.totalPrice = Math.round(this.basket.totalPrice * 100) / 100;
        utils_1.saveBasket(this.basket);
    };
    BasketComponent.prototype.decreaseItem = function (item) {
        var storedItem = this.basket.items[item._id];
        if (!storedItem)
            return;
        storedItem.qty--;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.basket.totalPrice -= storedItem.item.price;
        this.basket.totalQuantity--;
        this.totalQuantity = this.basket.totalQuantity;
        this.totalPrice = Math.round(this.basket.totalPrice * 100) / 100;
        utils_1.saveBasket(this.basket);
    };
    BasketComponent.prototype.removeItem = function (item) {
        this.basket.totalPrice -= item.price;
        this.totalPrice = Math.round(this.basket.totalPrice * 100) / 100;
        this.basket.totalQuantity -= item.qty;
        this.totalQuantity = this.basket.totalQuantity;
        delete this.basket.items[item.item._id];
        this.items = this.basket.generateArray();
        utils_1.saveBasket(this.basket);
    };
    BasketComponent.prototype.removeAll = function () {
        this.basket.items = {};
        this.basket.totalPrice = 0;
        this.basket.totalQuantity = 0;
        this.totalPrice = Math.round(this.basket.totalPrice * 100) / 100;
        this.totalQuantity = this.basket.totalQuantity;
        this.items = this.basket.generateArray();
        utils_1.saveBasket(this.basket);
    };
    BasketComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "./basket.component.html",
            styles: ["\n            img{\n                max-height: 150px;\n            }\n    "]
        }), 
        __metadata('design:paramtypes', [basket_service_1.BasketService])
    ], BasketComponent);
    return BasketComponent;
}());
exports.BasketComponent = BasketComponent;
//# sourceMappingURL=basket.component.js.map