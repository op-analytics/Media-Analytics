import Joi from '@hapi/joi';
import URLREGEX from './regexurl';

const options = {
  NODE_ENV: Joi.string()
    .default('development')
    .allow('development', 'test', 'production'),
};

if (process.env.NODE_ENV === 'development') {
  options.REACT_APP_API_URL = Joi.string()
    .regex(URLREGEX)
    .required();
}

const schema = Joi.object(options).unknown(true);

const { error, value: config } = schema.validate(process.env);

if (error) {
  alert(`Error in env, Check the console for more info`);
  // eslint-disable-next-line no-console
  console.error('Missing property in env.', error.message);
}

const API_URL =
  config.NODE_ENV === 'production' ? '/api' : config.REACT_APP_API_URL;

export { config, API_URL };
