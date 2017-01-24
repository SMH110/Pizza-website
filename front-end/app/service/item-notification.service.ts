import { Injectable } from '@angular/core';

@Injectable()
export class ItemNotificationService {
    notificationMessage: string;
    isNotificationShown: boolean = false;
    
    private clearNotificationTimer: NodeJS.Timer;

    notify(item: Item): void {
        clearTimeout(this.clearNotificationTimer);
        this.notificationMessage = `${item.name} added to your basket`;
        this.isNotificationShown = true;
        
        this.clearNotificationTimer = setTimeout(() => {
            this.isNotificationShown = false;
        }, 3000);
    }
}