const express = require("express");
const app = express();
const proxy = require('express-http-proxy');

app.use('/book', proxy('/:3002'));
app.use('/user', proxy('/:3003'));

module.exports = app;
