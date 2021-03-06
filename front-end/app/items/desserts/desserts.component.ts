import { Component } from "@angular/core";
import Catalogue from "../../../../shared/static-data/catalogue";
import { Item } from "../../../../shared/dtos";

@Component({
  templateUrl: `./desserts.component.html`
})
export class DessertsComponent {
  desserts: Item[];

  constructor() {
    this.desserts = Catalogue.filter(x => x.tags.indexOf("dessert") !== -1);
  }
}
