const express = require('express');
const app = express();

const appRouter = require('./routes/app.router');

app.use('/', appRouter);

app.use(function(req, res) {
    res.status(404)
        .json({
            message: 'Not found'
        });
});

app.use(function(err, req, res) {
    res.status(500)
        .json({
            message: 'Something went wrong!'
        });
});

module.exports = app;