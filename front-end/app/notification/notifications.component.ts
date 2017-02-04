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
        setTimeout(() => {
            this.notifications.splice(this.notifications.indexOf(notification), 1);
        }, 3000);
    }
}
