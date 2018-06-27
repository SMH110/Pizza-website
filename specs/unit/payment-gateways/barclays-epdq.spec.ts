import { expect } from 'chai';
import BarclaysEPDQ from '../../../back-end/payment-gateways/barclays-epdq';

describe('Barclays EPDQ', () => {
    it('Payment Redirect URL generation should work as expected for certain problematic order amounts', async () => {
        let paymentRedirectDetails = await new BarclaysEPDQ('http://localhost/').createPaymentRedirect({
            _id: 'Some ID',
            save: () => Promise.resolve(),
            orderItems: [],
            buyer: {},
            billingAddress: {},
            totalPayment: 18.08
        } as any);
        expect(paymentRedirectDetails.url).to.contain('AMOUNT=1808&CURRENCY=GBP');
    });
});
