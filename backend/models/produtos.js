const mongoose = require('mongoose'); 

var produtosSchema = new mongoose.Schema({
    _id : {
        type: mongoose.Schema.ObjectId,
        auto: true,
    },
    id : {
        type: Number,
        require: true,
        unique: true,
    },
    nome: {
        type: String,
        required: true,
    },
    src: {
        type: String,
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Produtos', produtosSchema);
