import { expect } from 'chai';
import { isPostcodeValid } from '../../../shared/validation/delivery-area-validator';

describe('Delivery Area Validator', function () {
    describe('When the postcode is not valid', () => {
        it('Should return false, less than 6 characters', () => {
            expect(isPostcodeValid('CR7')).to.be.equal(false);
        });
        it('Should return false, more than 7 characters', () => {
            expect(isPostcodeValid('CR712GBE')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeValid('AA712SP')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeValid('SE256CR')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeValid('SW119JL')).to.be.equal(false);
        });
        it(`Should return false, doesn't start with valid value`, () => {
            expect(isPostcodeValid('SE65AA')).to.be.equal(false);
        });
        it(`Should return false, Not valid UK postcode `, () => {
            expect(isPostcodeValid('CR7CR7')).to.be.equal(false);
        });
        it(`Should return false, Not valid UK postcode `, () => {
            expect(isPostcodeValid('SE5SE5')).to.be.equal(false);
        });
        it(`Should return false, Not valid UK postcode and it is more than 7 characters`, () => {
            expect(isPostcodeValid('SE19SE19')).to.be.equal(false);
        });
    });
    describe('When the postcode is valid', () => {
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('CR72GB')).to.be.equal(true);
        });
        it('Should return true - 7 characters', () => {
            expect(isPostcodeValid('SE216CR')).to.be.equal(true);
        });
        it('Should return true - 7 characters', () => {
            expect(isPostcodeValid('SW129JL')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('SE50AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('SE50AQ')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('SE50YB')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('SE55AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('SE59YN')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('SW90AA')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('SW90UQ')).to.be.equal(true);
        });
        it('Should return true - 6 characters', () => {
            expect(isPostcodeValid('SW99ZW')).to.be.equal(true);
        });
    });
});