const mongoose = require('mongoose');

const connect = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/chapa-quente', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        .then(() => {
            console.log('Conectado ao banco de dados');
        })
    } catch (error) {
        console.log('Erro ao conectar ao banco de dados: ', error);
    }
}

module.exports = connect;