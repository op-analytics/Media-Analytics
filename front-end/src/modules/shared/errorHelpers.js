function createGeneralError(errorMessage) {
  return { type: ['general'], message: errorMessage };
}

export function getErrorsFromResponse(response) {
  const errors = response.errors || response.data.errors
  return errors || [createGeneralError(response.statusText)]
}
