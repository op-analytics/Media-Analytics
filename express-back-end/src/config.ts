import { boolean, number, object, string } from '@hapi/joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = object({
  NODE_ENV: string()
    .allow('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: number().default(7000),
  MONGOOSE_DEBUG: boolean().when('NODE_ENV', {
    is: string().equal('development'),
    then: boolean().default(true),
    otherwise: boolean().default(false),
  }),
  MONGO_URI: string()
    .required()
    .description('Mongo DB host url'),
  TOKEN_SECRET: string()
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
  secret: envVars.TOKEN_SECRET,
};

export default config;
