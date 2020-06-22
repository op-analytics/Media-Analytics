import { Schema } from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';

/**
 * Interface for a validation error message
 */
// FIXME: Separate this into a top level interfaces directory
interface ValidationErrorMessage {
  message: string;
  type: (string | number)[];
}

/**
 * Create a validation error from a message
 *
 * @param message - The joi schema to validate the body of the request against
 * @param type - The fields/types the error message belongs to
 * @returns A validation error message
 */
// FIXME: Separate this into a top level lib directory
const createValidationError = (
  message: string,
  type: (string | number)[] = ['general'],
): ValidationErrorMessage => ({
  type,
  message,
});

/**
 * Creates a middleware function using the given schema to validate the body of a request
 *
 * @param schema - The joi schema to validate the body of the request against
 * @returns A middleware function that validates the body of a request against the given schema
 */
const validateBody = (schema: Schema) => {
  // Check schema is valid
  // Return a function that:
  return (req: Request, res: Response, next: NextFunction): void => {
    // Validates using the given schema and options
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    // If there are errors we should respond with them
    if (error)
      res.status(422).json({
        errors: error.details.map(e => createValidationError(e.message, e.path)),
      });
    // Else call next
    else next();
  };
};

export default validateBody;
