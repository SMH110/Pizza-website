import { IRequest } from '../router/router-utils';
import PayPal, { IsPayPalEnabled } from './paypal';
import BarclaysEPDQ, { IsBarclaysEPDQEnabled } from './barclays-epdq';
import { PaymentGateway } from './interfaces';

export function getPaymentGateway(req: IRequest<PlaceOrderRequest>): PaymentGateway {
    let baseReturnAddress = req.protocol + '://' + req.get('host');
    if (req.body.paymentMethod === 'PayPal') {
        return new PayPal(baseReturnAddress);
    }
    if (['MasterCard', 'JCB', 'Maestro', 'VISA'].indexOf(req.body.paymentMethod) !== -1) {
        return new BarclaysEPDQ(baseReturnAddress);
    }

    throw new Error(`No payment gateway registered for payment method ${req.body.paymentMethod}`);
}

export function getAvailablePaymentMethods(): PaymentMethod[] {
    let paymentMethods: PaymentMethod[] = [];
    if (IsPayPalEnabled) {
        paymentMethods.push('PayPal');
    }
    if (IsBarclaysEPDQEnabled) {
        paymentMethods.push('MasterCard', 'JCB', 'Maestro', 'VISA');
    }
    return paymentMethods;
}