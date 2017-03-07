import { expect } from 'chai';
import { validateOrderRequest } from '../../../shared/validation/place-order-request-validator';
import { createValidOrders, PAYMENT_METHODS } from './order-helpers';

describe('Test Data', () => {
    it('The valid test data orders are always valid', () => {
        for (let order of createValidOrders()) {
            expect(validateOrderRequest(order, PAYMENT_METHODS)).to.deep.equal([]);
        }
    });
});
