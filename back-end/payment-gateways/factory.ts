import { Request } from 'express';
import PayPal from './paypal';
import { parse } from 'url';

export function getPaymentGateway(req: Request): PaymentGateway {
    // For now, we always return PayPal.
    // When we add Cash and ePDQ then this will be where we select the one.
    let referer = parse(req.headers['referer']);
    let baseReturnAddress = referer.protocol + '//' + referer.host;
    return new PayPal(baseReturnAddress);
}