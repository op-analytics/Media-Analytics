import { Schema } from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';

interface ValidationErrorMessage {
  message: string;
  type: (string | number)[];
}

const createValidationError = (
  message: string,
  type: (string | number)[] = ['general'],
): ValidationErrorMessage => ({
  type,
  message,
});

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
