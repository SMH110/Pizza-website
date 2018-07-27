import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app",
  templateUrl: `./app.component.html`
})
export class AppComponent {
  private navigationEndEventsToProcess: NavigationEnd[] = [];

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navigationEndEventsToProcess.push(event);
        this.processNavigationEndEvents();
      }
    });
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTopAndCloseMobileNavMenu();
      }
    });
  }

  isCustomerHeaderShown(): boolean {
    if (this.router.url.indexOf("/admin/") === 0) {
      return false;
    }

    return true;
  }

  private processNavigationEndEvents() {
    if (typeof ga !== "undefined") {
      while (this.navigationEndEventsToProcess.length > 0) {
        let event = this.navigationEndEventsToProcess.shift();
        ga("set", "page", event.urlAfterRedirects);
        ga("send", "pageview");
      }
    } else {
      // Google analytics not yet loaded. Try again later.
      setTimeout(() => this.processNavigationEndEvents(), 5);
    }
  }

  private scrollToTopAndCloseMobileNavMenu() {
    window.scrollTo(null, 0);
    let collapsableMenu = document.querySelector(".navbar-collapse");
    if (collapsableMenu !== null && collapsableMenu.classList.contains("in")) {
      (document.querySelector(".mobile-menu-toggle") as HTMLElement).click();
    }
  }
}
