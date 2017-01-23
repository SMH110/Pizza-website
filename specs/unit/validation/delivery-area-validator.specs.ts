import { expect } from 'chai';
import { isPostcodeValid } from '../../../shared/validation/delivery-area-validator';

describe('Delivery Area Validator', function () {
    it('Should return true for valid postcode', () => {
        expect(isPostcodeValid('CR7')).to.be.equal(true);
    });
});