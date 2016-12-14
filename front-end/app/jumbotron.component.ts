import { Component, Input } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'my-jumbotron',
    templateUrl: `./jumbotron.component.html`,
    styles: [
        `
        .my-jumbotron {
          width: 100%;
          margin-bottom: 30px;
          padding: 0;
        }
        .round{
            border-radius: 4px;
        }
        `
    ]
})
export class JumbotronComponent {
    @Input() jumbotronImage: string;
    constructor() {

    }

}
