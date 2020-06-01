function createGeneralError(errorMessage) {
  return { type: ['general'], message: errorMessage };
}

export function getErrorsFromResponse(response) {
  return response.data.errors
    ? response.data.errors
    : [createGeneralError(response.statusText)];
}
