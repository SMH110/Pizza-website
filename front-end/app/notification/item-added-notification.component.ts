import { Component } from '@angular/core';
import { ItemNotificationService } from '../service/item-notification.service';
@Component({
    moduleId: module.id,
    selector: 'item-added-notification',
    templateUrl: 'item-added-notification.component.html',
    styles: [`
.notification {
    position: fixed;
    top: 10px;
    right: 10px;
    color: red;
    z-index: 100;
    opacity: 0;
    transition: .5s ease-in-out all;
}

.notification.show {
    opacity: 1;
}
    `]

})
export class ItemAddedNotificationComponent {

    constructor(public itemNotification: ItemNotificationService) {

    }
}