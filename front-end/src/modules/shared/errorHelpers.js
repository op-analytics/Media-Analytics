function createGeneralError(errorMessage) {
  return { type: ['general'], message: errorMessage };
}

export function getErrorsFromResponse(response) {
  return response.errors
    ? response.errors
    : [createGeneralError(response.statusText)];
}
