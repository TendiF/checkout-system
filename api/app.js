require('module-alias/register');
require('express-group-routes')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var bodyParser = require('body-parser')

// router
const apiRouter = require('./routes/api');

// middleware
const generalMiddleware = require('@middleware/general');

var app = express();

// enable cors
app.use(cors({
  exposedHeaders: ['Content-Disposition']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(generalMiddleware)

app.group('/api', (router) => {
  apiRouter(router)
})

// catch 404 and forward to error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.sendError(err, err.message, err.status)
});

module.exports = app;
