import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'my-footer',
    templateUrl: `./footer.component.html`,
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    constructor(private router: Router) { }

    isLinksShown(): boolean {
        if (this.router.url.indexOf("/admin/") === 0) {
            return false;
        }

        return true;
    }
}
