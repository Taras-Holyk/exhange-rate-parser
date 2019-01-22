const express = require('express');
const app = express();

const appRouter = require('@routes/app.router');

app.use('/', appRouter);

app.use(function (req, res) {
  res.status(404)
    .json({
      success: false,
      message: 'Not found'
    });
});

app.use(function (err, req, res, next) {
  if (err) {
    res.status(500)
      .json({
        success: false,
        message: 'Something went wrong!'
      });
  }

  next();
});

module.exports = app;
