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
var DrinksComponent = (function () {
    function DrinksComponent(itemService) {
        this.itemService = itemService;
    }
    DrinksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemService.getDrinks()
            .subscribe(function (drinks) { return _this.drinks = drinks; });
    };
    DrinksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "./drinks.component.html",
        }), 
        __metadata('design:paramtypes', [items_service_1.ItemService])
    ], DrinksComponent);
    return DrinksComponent;
}());
exports.DrinksComponent = DrinksComponent;
//# sourceMappingURL=drinks.component.js.map