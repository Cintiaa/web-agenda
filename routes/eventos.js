const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventos');

//Request para criar um novo evento
router.post('/eventos', eventoController.novoEvento);


module.exports = router;