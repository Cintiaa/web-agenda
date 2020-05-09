const mongoose = require('mongoose');
mongoose.Promise = Promise;

const EventoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    data: {
        type: String,
        required: true,
    },
    horario: {
        type: String, //verificar!!
        required: true
    }, 
});

module.exports = mongoose.model('Eventos', EventoSchema);