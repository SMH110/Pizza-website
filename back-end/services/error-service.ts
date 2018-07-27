let ERRORS: Error[] = [];

export function storeError(error: Error) {
  ERRORS.push(error);
}

export function getErrors() {
  return ERRORS.slice();
}

export function clearErrors() {
  ERRORS = [];
}
