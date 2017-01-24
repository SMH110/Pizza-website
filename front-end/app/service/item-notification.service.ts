import { Injectable } from '@angular/core';

@Injectable()
export class ItemNotificationService {
    notificationMessage: string = '';
    isNotificationShown: boolean = false;
    clearNotificationTimer: any;
    notify(item: Item): void {
        this.notificationMessage = '';
        clearTimeout(this.clearNotificationTimer);
        this.notificationMessage = `${item.name} added to your basket`;
        this.isNotificationShown = true;
        this.clearNotificationTimer = setTimeout(() => {
            this.isNotificationShown = false;
        }, 3000);
    }
}