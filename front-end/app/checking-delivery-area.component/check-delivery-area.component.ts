import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: `./check-delivery-area.component.html`,
    styles:[
        `h2 {
            margin-bottom: 20px;
        }
        input{
            width: 110px;;
        }
        `
    ]
   
})
export class CheckDeliveryAreaComponent {
    constructor() {
        
    }

    isPostcodeValid(postcode: string) {
         ['CR7', 'SE2'].find(x => postcode.toUpperCase().trim().startsWith(x)) !== undefined;
    }
}



