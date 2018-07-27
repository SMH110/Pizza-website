import { Component, OnInit } from "@angular/core";

import { BaseModalComponent } from "../base-modal.component";
import { DeliveryMethod } from "../../../shared/dtos";

@Component({
  templateUrl: "./confirm-order-modal.component.html"
})
export class ConfirmOrderModalComponent
  extends BaseModalComponent<DeliveryMethod, number>
  implements OnInit {
  readyInMinutes: number;

  ngOnInit() {
    this.readyInMinutes = this.data === "Collection" ? 0 : 10;
  }

  confirm() {
    return this.closeWithResult(this.readyInMinutes);
  }
}
