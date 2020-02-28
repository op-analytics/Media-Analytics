const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const api = require('./api');

const app = express();

// Stay safe where a helmet
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// log http requests
app.use(morgan('dev'));

app.use('/', api);

module.exports = app;
