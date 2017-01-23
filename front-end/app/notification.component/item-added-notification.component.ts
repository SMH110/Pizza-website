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
    right: 0;
    width: 300px;
    color: red;
    z-index: 100;
    opacity: 0;
    transition: .5s ease-in-out all;
}

.show{
    opacity: 1 !important;
}
    `]

})
export class ItemAddedNotificationComponent {

    constructor(public itemNotification: ItemNotificationService) {

    }
}