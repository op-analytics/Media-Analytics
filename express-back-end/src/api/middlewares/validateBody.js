const Joi = require('@hapi/joi');

const createValidationError = (message, type = ['general']) => ({
  type,
  message,
});

const validateBody = schema => {
  // Check schema is valid
  const validSchema = schema instanceof Joi.constructor;
  if (!validSchema) throw Error('Schema supplied was not valid');

  // Return a function that:
  return (req, res, next) => {
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

module.exports = validateBody;
