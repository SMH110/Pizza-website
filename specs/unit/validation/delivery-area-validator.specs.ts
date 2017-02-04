import { expect } from 'chai';
import { isPostcodeWithinDeliveryArea } from '../../../shared/validation/delivery-area-validator';

describe('Delivery Area Validator', function () {
    describe('When the postcode is not valid', () => {
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeWithinDeliveryArea('AA712SP')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeWithinDeliveryArea('SE256CR')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeWithinDeliveryArea('SW119JL')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeWithinDeliveryArea('SE65AA')).to.be.equal(false);
        });
    });
    describe('When the postcode is valid', () => {
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('CR72GB')).to.be.equal(true);
        });
        it('Should return true - 7 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SE216CR')).to.be.equal(true);
        });
        it('Should return true - 7 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SW129JL')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SE50AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SE50AQ')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SE50YB')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SE55AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SE59YN')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SW90AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SW90UQ')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeWithinDeliveryArea('SW99ZW')).to.be.equal(true);
        });
    });
});