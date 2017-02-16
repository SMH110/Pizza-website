import { Component, Input } from '@angular/core';


@Component({
    selector: 'jumbotron',
    templateUrl: `./jumbotron.component.html`,
    styles: [
        `
        .jumbotron {
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
