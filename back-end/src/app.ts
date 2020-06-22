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
// Allow cors
app.use(cors());

// Connect to the database using the connection string in the config
db.connect(config.mongooseURI);
// Log queries in development
db.mongoose.set('debug', config.mongooseDebug);

// Check the jwt in the request and set the user if the jwt is valid
app.use(checkTokenSetUser);

app.use('/api', api);

export default app;
