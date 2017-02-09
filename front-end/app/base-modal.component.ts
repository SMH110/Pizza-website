import { ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

/**
 * A base class which all modals should derive from.
 * @param {type} TInput - The type of the data that should be passed to this modal, or void if it does not take any data.
 * @param {type} TOutput - The type of the data that this modal returns to the caller, or void if it does not return any data.
 */
export class BaseModalComponent<TInput, TOutput> {
    @ViewChild(ModalComponent)
    private modal: ModalComponent;

    /** The data that was passed to this modal, if any */
    protected data?: TInput;

    private result?: TOutput;
    private error?: Error;

    /**
     * Opens the modal.
     * @param options Options for the modal, including any data to pass
     * @return A promise containing the result of the modal. This promise will not resolve/reject if the modal is cancelled.
     */
    public open(options?: ModalOptions<TInput>): Promise<TOutput> {
        if (options && options.data) {
            this.data = options && options.data;
        }

        let promise = new Promise<TOutput>((resolve, reject) => {
            this.modal.onClose.subscribe(() => {
                resolve(this.result);
            });
            this.modal.onDismiss.subscribe(() => {
                reject(this.error);
            });
        });

        return this.modal.open(options && options.size)
            .then(() => promise);
    }

    /**
     * Closes the modal, optionally providing a result to the caller that opened the modal.
     * @param result The result to provide to the caller that opened the modal.
     */
    protected closeWithResult(result?: TOutput): Promise<void> {
        this.result = result;
        return this.modal.close();
    }

    /**
     * Closes the modal providing an error to the caller that opened the modal.
     * @param error The error to provide to the caller that opened the modal.
     */
    protected closeWithError(error: Error) {
        this.error = error;
        this.modal.dismiss();
    }

    /**
     * Closes the modal providing no feedback to the caller that opened the modal.
     */
    protected cancel() {
        this.modal.dismiss();
    }
}

export interface ModalOptions<T> {
    data?: T;
    size?: string;
}
