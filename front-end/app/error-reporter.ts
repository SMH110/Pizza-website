import { ErrorHandler } from '@angular/core';

export default class ErrorReporter implements ErrorHandler {
    handleError(error: Error) {
        if (typeof ga !== 'undefined') {
            ga('send', 'exception', {
                'exName': error.name,
                'exDescription': error.message,
                'exStack': error.stack
            });
        }
        console.error(error);
    }
}