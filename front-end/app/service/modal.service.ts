import { Injectable, EventEmitter, Type } from '@angular/core';
import { BaseModalComponent, ModalOptions } from '../base-modal.component';

@Injectable()
export class ModalService {
    public modalRequested = new EventEmitter<ModalRequest<any, any>>();

    open<TInput, TOutput>(componentType: Type<BaseModalComponent<TInput, TOutput>>, options?: ModalOptions<TInput>) {
        return new Promise<TOutput>((resolve, reject) => {
            this.modalRequested.emit({
                componentType,
                options,
                resolve,
                reject
            });
        });
    }
}

export interface ModalRequest<TInput, TOutput> {
    componentType: Type<BaseModalComponent<TInput, TOutput>>;
    options?: ModalOptions<TInput>;
    resolve: (value?: TOutput) => void;
    reject: (reason?: Error) => void;
}
