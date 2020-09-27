const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const propietarioRouter = require('./routes/propietario.route');

const app = express();


/**
 * importar dbmanager
*/
const dbManager = require ("./dataBase/db.manager");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/propietarios', propietarioRouter);

/**
 * conexion y creación DB
 */
dbManager.sequelizeConnection.authenticate().then(
  () => {
      console.log("***** Connection has been stablished *******");
      dbManager.sequelizeConnection.sync ().then(
          () => {
              console.log ("Database Synced");
          }
      );
  }
).catch(
  err => {
      console.log("Unable to connect to the database...", err)
  }
);



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
