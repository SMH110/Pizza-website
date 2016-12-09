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
var utils_1 = require('../utils');
var BasketService = (function () {
    function BasketService() {
        this.items = JSON.parse(utils_1.storedItems || '{}');
        this.totalQuantity = JSON.parse(utils_1.storedQuantity || '0');
        this.totalPrice = JSON.parse(utils_1.storedTotalPrice || '0');
    }
    BasketService.prototype.generateArray = function () {
        var items = [];
        for (var item in this.items) {
            items.push(this.items[item]);
        }
        return items;
    };
    BasketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BasketService);
    return BasketService;
}());
exports.BasketService = BasketService;
//# sourceMappingURL=basket.service.js.map