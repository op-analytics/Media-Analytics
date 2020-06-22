import Joi from '@hapi/joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(7000),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  MONGO_URI: Joi.string()
    .required()
    .description('Mongo DB host url'),
  REDIS_URI: Joi.string()
    .required()
    .description('Redis DB host url'),
  TOKEN_SECRET: Joi.string()
    .required()
    .description('The secret used to encrypt user data'),
  CONFIRMATION_REDIRECT: Joi.string()
    .required()
    .description('The url to redirect to after a users email is confirmed'),
  BASE_URL: Joi.string()
    .required()
    .description('The url the app is running on'),
  GMAIL_EMAIL: Joi.string()
    .required()
    .description('The email for the account used to send confirmation emails'),
  GMAIL_CLIENT_ID: Joi.string()
    .required()
    .description(
      'The client id for the google account used to send confirmation emails',
    ),
  GMAIL_CLIENT_SECRET: Joi.string()
    .required()
    .description(
      'The client secret for the google account used to send confirmation emails',
    ),
  GMAIL_REFRESH_TOKEN: Joi.string()
    .required()
    .description(
      'The refresh token for the google account used to send confirmation emails',
    ),
})
  .unknown()
  .required();

// Validate the env against the schema
const { error, value: envVars } = envVarsSchema.validate(process.env);
// If there are errors throw them (This crashes the app)
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Export the env as a nicer object
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  baseURL: envVars.BASE_URL,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  mongooseURI: envVars.MONGO_URI,
  redisURI: envVars.REDIS_URI,
  secret: envVars.TOKEN_SECRET,
  confirmationRedirect: envVars.CONFIRMATION_REDIRECT,
  gmail: {
    email: envVars.GMAIL_EMAIL,
    clientId: envVars.GMAIL_CLIENT_ID,
    clientSecret: envVars.GMAIL_CLIENT_SECRET,
    refreshToken: envVars.GMAIL_REFRESH_TOKEN,
  },
};

export default config;
