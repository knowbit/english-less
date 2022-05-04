var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getLess = require('./routes/get_less');
var admin_adminRouter = require('./routes/admin/admin');
var admin_getLess = require('./routes/admin/get_less');
var admin_getArrId = require('./routes/admin/get_id');
var admin_dropLesson = require('./routes/admin/drop_less');
var admin_createLesson = require('./routes/admin/create_less');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/get_less', getLess);
app.use('/admin', admin_adminRouter);
app.use('/admin/get_id',admin_getArrId);
app.use('/admin/get_less', admin_getLess);
app.use('/admin/drop_less', admin_dropLesson);
app.use('/admin/create_less', admin_createLesson);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
