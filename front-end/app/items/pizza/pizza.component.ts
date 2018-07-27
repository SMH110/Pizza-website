import { Component } from "@angular/core";
import Catalogue from "../../../../shared/static-data/catalogue";
import { Item } from "../../../../shared/dtos";

@Component({
  templateUrl: `./pizza.component.html`,
  styleUrls: [`./pizza.component.scss`]
})
export class PizzaComponent {
  pizzas: Item[];

  constructor() {
    this.pizzas = Catalogue.filter(x => x.tags.indexOf("pizza") !== -1);
  }
}
