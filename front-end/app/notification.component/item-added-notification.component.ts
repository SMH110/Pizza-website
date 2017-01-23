import {Component} from '@angular/core';

Component({
    moduleId:module.id,
    selector:'item-added-notification',
    templateUrl: 'item-added-notification.component.html',
    styles: [`
        .notification{
            position: fixed;
              bottom: 0;
              right: 0;
            width: 300px;
            border: 3px solid #73AD21;
        }
    
    `]
  
})
export class ItemAddedNotificationComponent{

}