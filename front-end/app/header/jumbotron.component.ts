import { Component, Input } from "@angular/core";

@Component({
  selector: "jumbotron",
  templateUrl: `./jumbotron.component.html`,
  styleUrls: [`./jumbotron.component.scss`]
})
export class JumbotronComponent {
  @Input() jumbotronImage: string;
  constructor() {}
}
