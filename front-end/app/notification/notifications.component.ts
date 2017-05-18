import { Component } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { ErrorService } from '../service/error.service';

@Component({
    selector: 'notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.scss']
})
export class NotificationsComponent {
    notifications: string[] = [];

    constructor(private notificationService: NotificationService, public errorService: ErrorService) {
        this.notificationService.itemAdded.asObservable().subscribe(item => {
            this.notify(`${item.name} added to your basket`);
        });

        this.notificationService.signedOut.asObservable().subscribe(() => {
            this.notify("You have been successfully signed out.");
        });

        this.notificationService.discountSuccessfullyApplied.asObservable().subscribe(() => {
            this.notify("The discount code you have entered has been successfully applied to your order.");
        });
    }

    notify(notification: string) {
        this.notifications.push(notification);

        setTimeout(() => {
            let errorList = document.getElementById('notificationList');
            if ((errorList as any).scrollIntoViewIfNeeded !== undefined) {
                (errorList as any).scrollIntoViewIfNeeded(true/*Align to center of view*/);
            } else {
                errorList.scrollIntoView(false/*Align to bottom of view*/);
            }
        });

        setTimeout(() => {
            this.notifications.splice(this.notifications.indexOf(notification), 1);
        }, 3000);
    }
}
