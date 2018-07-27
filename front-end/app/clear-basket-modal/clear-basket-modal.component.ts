import { Component } from "@angular/core";

import { BaseModalComponent } from "../base-modal.component";

@Component({
  templateUrl: "./clear-basket-modal.component.html",
  styleUrls: ["./clear-basket-modal.component.scss"]
})
export class ClearBasketModalComponent extends BaseModalComponent<void, void> {
  confirm() {
    return this.closeWithResult();
  }
}
