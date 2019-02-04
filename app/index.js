require('module-alias/register');

const config = require('dotenv').config();
if (config.error) {
  throw config.error;
}

const port = process.env.APP_PORT || 3000;
const express = require('express');
const app = express();
const validator = require('express-validator');

const routes = require('@routes');
const errorHandler = require('@handlers/error.handler');

require('@config/database');

app.use(routes);
app.use(errorHandler);
app.use(validator());

app.listen(port, function () {
  console.log(`App running on the port ${port}`);
});

module.exports = app;
