import { Component } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { ErrorService } from '../service/error.service';

@Component({
    moduleId: module.id,
    selector: 'notifications',
    templateUrl: 'notifications.component.html',
    styles: [`
ul {
    padding-left: 30px;
}
`]

})
export class NotificationsComponent {
    notifications: string[] = [];

    constructor(private notificationService: NotificationService, public errorService: ErrorService) {
        this.notificationService.itemAdded.asObservable().subscribe(item => {
            this.notify(item);
        });
    }

    notify(item: Item) {
        let notification = `${item.name} added to your basket`;
        this.notifications.push(notification);
        // This code should not be in this service. It's a view concern.
        setTimeout(() => {
            let errorList = document.getElementById('notificationList');
            if (errorList['scrollIntoViewIfNeeded'] !== undefined) {
                errorList['scrollIntoViewIfNeeded'](true/*Align to center of view*/);
            } else {
                errorList.scrollIntoView(false/*Align to bottom of view*/);
            }
        });
        setTimeout(() => {
            this.notifications.splice(this.notifications.indexOf(notification), 1);
        }, 3000);
    }
}