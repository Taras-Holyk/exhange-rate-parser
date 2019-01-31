const express = require('express');
const app = express();
const appRouter = require('@routes/app.router');

app.use('/', appRouter);

module.exports = app;
