import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import api from './api/api.router';
import { checkTokenSetUser } from './api/auth/middlewares';
import config from './config';
import db from './db';

const app = express();

// Stay safe, wear a helmet
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
