const express = require('express');
const app = express();
const appRouter = require('@routes/app.router');
const userRouter = require('@routes/user.router');

app.use('/', appRouter);
app.use('/users', userRouter);

module.exports = app;
