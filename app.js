var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var categoriesRouter = require('./routes/categories')
var registerRouter = require('./routes/register');
var carritoRouter = require('./routes/carrito');
var detalleProductoRouter = require('./routes/detalleProducto');
// var ejemploRouter = require('./routes/ejemplo');
var crudIndexRouter = require('./routes/crudIndex');
var cargaArticuloRouter = require('./routes/cargaArticulo');

var app = express();

// Implementacion de PUT y DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter)
app.use('/register', registerRouter);
app.use('/carrito', carritoRouter);
app.use('/detalleProducto', detalleProductoRouter);
// app.use('/ejemplo', ejemploRouter);
app.use('/crudIndex', crudIndexRouter);
app.use('/cargaArticulo', cargaArticuloRouter);

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
