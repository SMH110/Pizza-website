import { expect } from 'chai';
import { discountCalculator } from '../../../shared/discount/discounts-calculator';

describe('Discount', () => {
    let discountCalc: any; let basket;
    describe('When the Order total is equal or over 25', () => {
        beforeEach(() => {
            basket = [createOrder('Neapolitan Pizza', 16.99, 2, 'large')];
            discountCalc = discountCalculator(basket);
        });
        it('Should apply the discount on the order', () => {
            expect(discountCalc).to.be.equal(10.19)
        });
    });
    describe('When the Order total is les than 25', () => {
        beforeEach(() => {
            basket = [createOrder('Neapolitan Pizza', 16.99, 1, 'large')];
            discountCalc = discountCalculator(basket);
        });
        it('Should Not apply the discount on the order', () => {
            expect(discountCalc).to.be.equal(0)
        });
    });

});


function createOrder(name: string, price: number, quantity: number, version?: string) {
    return {
        name,
        price,
        quantity,
        version
    }
}