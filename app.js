const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');

require('./passport')(passport);

//Configurando conexão com banco de dados
mongoose.connect('mongodb://agenda:agenda123@ds151086.mlab.com:51086/db-agenda', { useNewUrlParser: true })
  .then(() => {
    console.log('Conexão com banco de dados realizada com sucesso');
  })
  .catch((error) => {
    console.log('Erro na conexão com o banco de dados', error);
  });


const app = express();

const indexRouter = require('./routes/index');
const usuarioRouter = require('./routes/usuario');
const authRouter = require('./routes/auth')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

require('./passport')(passport);
app.use(session({
  secret: 'supersecreto',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
