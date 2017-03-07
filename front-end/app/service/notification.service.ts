import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationService {
    public itemAdded = new EventEmitter<Item>();
    public signedOut = new EventEmitter<string>();
}
