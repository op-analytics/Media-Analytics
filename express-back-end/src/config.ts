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
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  mongooseURI: envVars.MONGO_URI,
  redisURI: envVars.REDIS_URI,
  secret: envVars.TOKEN_SECRET,
};

export default config;
