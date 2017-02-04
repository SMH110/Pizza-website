import { expect } from 'chai';
import { discountCalculator } from '../../../shared/discount-calculator';

describe('Discount Calculator', () => {
    it('Should return the discount amount when the order total is 25', () => {
        expect(discountCalculator(25)).to.equal(5)
    });
    it('Should return the discount amount when the order total is over 25', () => {
        expect(discountCalculator(30)).to.equal(6)
    });
    it('Should return null when the order total is less than 25', () => {
        expect(discountCalculator(24.99)).to.equal(null)
    });
});
