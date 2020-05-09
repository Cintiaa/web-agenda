const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const Evento = require('../models/eventos');

module.exports = function (passport) {
    router.post('/cadastro', function (req, res) {
        var body = req.body,
            username = body.username,
            email = req.body.email,
            password = body.password;
        Usuario.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                res.status(500).send('Ocorreu um Erro!')
            } else {
                if (doc) {
                    res.status(500).send('Usuário já existe!')
                } else {
                    var novoUsuario = new Usuario()
                    novoUsuario.username = username;
                    novoUsuario.email = email;
                    novoUsuario.password = novoUsuario.hashPassword(password)
                    novoUsuario.save(function (err, user) {
                        if (err) {
                            res.status(500).send('Erro no banco de dados!')
                        } else {
                            console.log('sucesso', user);
                            res.redirect('/login')
                        }
                    })
                }
            }
        })
    });

    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/home',
    }), function (req, res) {
        res.send('hey')
    })


    //Request para criar um novo evento
    router.post('/eventos', function (req, res) {

        const evento = new Evento();
            evento.nome = req.body.nome,
            evento.descricao = req.body.descricao,
            evento.data = req.body.data,
            evento.horario = req.body.horario,
            evento.save(function (err, evento) {
                if (err) {
                    console.log('Erro');
                    res.status(500).send('Erro no servidor, por favor tente novamente');
                } else {
                    console.log('Sucesso', evento);
                    res.redirect('/home');
                }
            });

    });


    return router;
};