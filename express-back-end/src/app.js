const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./db');
const config = require('./config');

const { checkTokenSetUser } = require('./api/auth/middlewares');

const api = require('./api/api.router');

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

// Connect to mongodb
db.connect(config.mongooseURI);
db.mongoose.set('debug', config.mongooseDebug);

app.use(checkTokenSetUser);

app.use('/api', api);

module.exports = app;
