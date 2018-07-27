import { Document, Schema, model } from 'mongoose';
import { Voucher } from '../../shared/domain-entities';

// TODO: Why are we using mongoose? What value do we get from maintaining these schemas?
export default model<PersistedVoucher>('vouchers', new Schema({
    code: String,
    email: String,
    amount: Number,
    dateIssued: Date,
    dateUsed: Date,
    expiryDate: Date
}, {
        usePushEach: true
    }));

export type PersistedVoucher = Voucher & Document;
