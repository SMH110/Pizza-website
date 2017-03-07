import { expect } from 'chai';
import { BasketService } from '../../shared/services/basket-service';


describe('Basket Service', () => {
    it('Should be able to add an item without any options - the description should be as expected', () => {
        let pizzaItem = createBasketItem();
        let basketService = new BasketService();
        basketService.addToBasket(pizzaItem);
        expect(BasketService.getDescription(basketService.items[0])).to.be.equal("Margherita - Medium");
        expect(basketService.items[0].name).to.be.equal("Margherita");
    });

    it('Should be able to add an item with an option - the description should be as expected', () => {
        let pizzaItem = createBasketItem();
        pizzaItem.options = ["Gorgonzola"];
        let basketService = new BasketService();
        basketService.addToBasket(pizzaItem);
        expect(BasketService.getDescription(basketService.items[0])).to.be.equal("Margherita - Medium - Gorgonzola");
    });

    it('Should not group the item when the item added with different options', () => {
        let pizzaItem1 = createBasketItem();
        pizzaItem1.options = ["Gorgonzola"];
        let pizzaItem2 = createBasketItem();
        pizzaItem2.options = ["Broccoli"];
        let basketService = new BasketService();
        basketService.addToBasket(pizzaItem1);
        basketService.addToBasket(pizzaItem2);
        expect(BasketService.getDescription(basketService.items[0])).to.be.equal("Margherita - Medium - Gorgonzola");
        expect(basketService.items[0].quantity).to.be.equal(1);
        expect(BasketService.getDescription(basketService.items[1])).to.be.equal("Margherita - Medium - Broccoli");
        expect(basketService.items[1].quantity).to.be.equal(1);
        expect(basketService.getTotalQuantity()).to.be.equal(2);

    });

    it('Should group the item when the item added more than once with the same options but the options added no in order', () => {
        let pizzaItem1 = createBasketItem();
        pizzaItem1.options = ["Broccoli", "Spring Onion"];
        let pizzaItem2 = createBasketItem();
        pizzaItem2.options = ["Spring Onion", "Broccoli"];
        let basketService = new BasketService();
        basketService.addToBasket(pizzaItem1);
        basketService.addToBasket(pizzaItem2);
        expect(BasketService.getDescription(basketService.items[0])).to.be.equal("Margherita - Medium - Broccoli, Spring Onion");
        expect(basketService.items[0].quantity).to.be.equal(2);
        expect(basketService.getTotalQuantity()).to.be.equal(2);
    });
});


function createBasketItem(): BasketItem {
    return {
        name: "Margherita",
        quantity: 1,
        version: "Medium",
        options: []
    }
}
