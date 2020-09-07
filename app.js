var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbConnection = require('./src/config/database/mongoose')
const errorHandle = require('./src/middleware/errorHandler')

var indexRouter = require('./src/routes/index');

var app = express();
// db connectivity
dbConnection();

app.use(logger('dev'));
app.use(express.json());

// request payload middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// error handling middleware
app.use(errorHandle)

module.exports = app;