/**
 * Create a general error that matches what the backend would
 * usualy return using an error message.
 *
 * @param {String} errorMessage Message to create a general error out of
 * @returns {Object}
 */
function createGeneralError(errorMessage) {
  return { type: ['general'], message: errorMessage };
}

/**
 * Create a general error that matches what the backend would
 * usualy return using an error message.
 *
 * @param {Object} response The response to extract the errors from
 * @returns {Object[]}
 */
export function getErrorsFromResponse(response) {
  const errors = response.errors || response.data.errors || null
  return errors || [createGeneralError(response.statusText)]
}
