const mongoose = require('mongoose');
const Evento = require('../models/eventos');

//Cria um novo evento

exports.novoEvento = function (req, res) {
    const evento = new Evento({
        nome: req.body.nome,
        descricao: req.body.descricao,
        data: req.body.data,
        horario: req.body.horario,
    });

    evento.save(function (err, evento) {
        if (err) {
            res.status(500).send('Erro no servidor, por favor tente novamente');
        } else {
            res.redirect('/home');
        }
    })

    return novoEvento;
}