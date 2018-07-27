import { Injectable, EventEmitter } from '@angular/core';
import { Item } from '../../../shared/dtos';

@Injectable()
export class NotificationService {
    public itemAdded = new EventEmitter<Item>();
    public signedOut = new EventEmitter<void>();
    public discountSuccessfullyApplied = new EventEmitter<void>();
    public voucherSuccessfullyApplied = new EventEmitter<void>();
}
