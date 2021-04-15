const express = require('express');
const router = require('./routers');
const errorHandler = require('./middlewares/error.handler');

const app = express();

app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

module.exports = app;
