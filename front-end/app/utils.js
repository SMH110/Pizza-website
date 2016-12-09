"use strict";
function saveBasket(basket) {
    localStorage.setItem('totalQuantity', JSON.stringify(basket.totalQuantity));
    localStorage.setItem('totalPrice', JSON.stringify(basket.totalPrice));
    localStorage.setItem('items', JSON.stringify(basket.items));
}
exports.saveBasket = saveBasket;
exports.storedQuantity = localStorage.getItem('totalQuantity');
exports.storedTotalPrice = localStorage.getItem('totalPrice');
exports.storedItems = localStorage.getItem('items');
//# sourceMappingURL=utils.js.map