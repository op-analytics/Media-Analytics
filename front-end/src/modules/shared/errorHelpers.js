function createGeneralError(errorMessage) {
  return { type: ['general'], message: errorMessage };
}

export function getErrorsFromResponse(response) {
  errors = response.errors || response.data.errors
  return errors ? errors : [createGeneralError(response.statusText)]
}
