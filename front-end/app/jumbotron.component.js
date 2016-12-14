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
var JumbotronComponent = (function () {
    function JumbotronComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JumbotronComponent.prototype, "jumbotronImage", void 0);
    JumbotronComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-jumbotron',
            templateUrl: "./jumbotron.component.html",
            styles: [
                "\n        .my-jumbotron {\n          width: 100%;\n          margin-bottom: 30px;\n          padding: 0;\n        }\n        .round{\n            border-radius: 4px;\n        }\n        "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], JumbotronComponent);
    return JumbotronComponent;
}());
exports.JumbotronComponent = JumbotronComponent;
//# sourceMappingURL=jumbotron.component.js.map