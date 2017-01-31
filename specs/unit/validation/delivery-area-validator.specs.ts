import { expect } from 'chai';
import { isPostcodeStartWithValidValue } from '../../../shared/validation/delivery-area-validator';

describe('Delivery Area Validator', function () {
    describe('When the postcode is not valid', () => {
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeStartWithValidValue('AA712SP')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeStartWithValidValue('SE256CR')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeStartWithValidValue('SW119JL')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeStartWithValidValue('SE65AA')).to.be.equal(false);
        });
    });
    describe('When the postcode is valid', () => {
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('CR72GB')).to.be.equal(true);
        });
        it('Should return true - 7 characters', () => {
            expect(isPostcodeStartWithValidValue('SE216CR')).to.be.equal(true);
        });
        it('Should return true - 7 characters', () => {
            expect(isPostcodeStartWithValidValue('SW129JL')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('SE50AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('SE50AQ')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('SE50YB')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('SE55AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('SE59YN')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('SW90AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('SW90UQ')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeStartWithValidValue('SW99ZW')).to.be.equal(true);
        });
    });
});