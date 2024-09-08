const bodyParser = require('body-parser');
const cors = require('cors');

// Rotas
const usuarios = require('./usuarios');
const produtos = require('./produtos');
const pedidos = require('./pedidos');

module.exports = app => {
    app
        .use(bodyParser.json())
        .use(cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }))
        .use('/usuarios', usuarios)
        .use('/produtos', produtos)
        .use('/pedidos', pedidos)
        .get('/', (req, res) => {
            res.status(200).json({ msg: 'Chapa Quente API' });
        });
}