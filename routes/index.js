const express = require('express');
const router = express.Router();
const passport = require('passport');
const evento = require('../models/eventos');

//Verifica se o usuário tem acesso a rota
const loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

/* Requisição GET para página de Login. */
router.get('/', function (req, res, next) {
  res.render('login');
});

/* Requisição GET para página de Login. */
router.get('/login', function (req, res) {
  if (req.query.fail)
    //devolve mensagem apropriada conforme a flag de erro na querystring
    res.render('login', { message: 'Usuário e/ou Senha incorretos!' });
  else
    res.render('login', { message: null });
});

/* Requisição GET para a página de Cadastro. */
router.get('/cadastro', function (req, res, next) {
  res.render('cadastro');
});

/* Requisição GET para a página Home. */
router.get('/home', loggedin, function (req, res, next) {
  res.render('home', { results: false });
});


router.get('/eventos', loggedin, function (req, res, next) {
  res.render('eventos');
});

/* Requisição GET para busca. */
router.get('/search', function (req, res, next) {
  evento.find({ nome: req.query.query }, function (err, eventos) {
    if (err)
      return console.error(err);
    console.dir(eventos);
    res.render('home', { results:true, search: req.query.query, list: eventos})
  })
});

/* Requisição POST de logout. */
router.get('/logout', function (req, res, next) {
  req.logOut();
  res.redirect('/');
});


module.exports = router;
