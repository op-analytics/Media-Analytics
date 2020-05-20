import express from 'express';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import db from './db';
import config from './config';

import { checkTokenSetUser } from './api/auth/middlewares';

import api from './api/api.router';

const app = express();

// Stay safe where a helmet
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// log http requests
app.use(morgan('dev'));
app.use(cors());

db.connect(config.mongooseURI);
db.mongoose.set('debug', config.mongooseDebug);

app.use(checkTokenSetUser);

app.use('/api', api);

export default app;
