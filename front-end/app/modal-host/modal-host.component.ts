import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
  ViewContainerRef
} from "@angular/core";
import { ModalService, ModalRequest } from "../service/modal.service";
import { BaseModalComponent } from "../base-modal.component";
import { Subscription } from "rxjs";

@Component({
  selector: "modal-host",
  template: "<ng-template #modalPlaceholder></ng-template>"
})
export class ModalHostComponent implements OnDestroy {
  @ViewChild("modalPlaceholder", { read: ViewContainerRef })
  placeholder: ViewContainerRef;

  private modalRequestedSubscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) {
    this.modalRequestedSubscription = this.modalService.modalRequested
      .asObservable()
      .subscribe(modalRequest => this.openModal(modalRequest));
  }

  private async openModal(modalRequest: ModalRequest<any, any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      modalRequest.componentType
    );
    let componentRef = this.placeholder.createComponent<
      BaseModalComponent<any, any>
    >(componentFactory);

    try {
      let result = await componentRef.instance.open(modalRequest.options);
      modalRequest.resolve(result);
    } catch (error) {
      if (error !== undefined) {
        modalRequest.reject(error);
      }
    } finally {
      componentRef.destroy();
    }
  }

  ngOnDestroy() {
    this.modalRequestedSubscription.unsubscribe();
  }
}
