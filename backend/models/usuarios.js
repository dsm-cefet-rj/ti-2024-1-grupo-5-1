const mongoose = require('mongoose');

/*
	"users": [
		{
			"id": "",
			"nome": "",
			"sobrenome": "",
			"email": "",
			"senha": "",
			"telefone": "",
			"logradouro": "",
			"numero": "",
			"complemento": "",
			"bairro": "",
			"cidade": "",
			"cep": "",
			"role": "",
			"date": ""
		}
	],
*/

var usersSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        auto: true
    },
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    logradouro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    complemento: {
        type: String,
        required: false
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuarios', usersSchema);
