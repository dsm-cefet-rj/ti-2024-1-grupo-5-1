const bodyParser = require('body-parser');
const cors = require('cors');

// Rotas
const usuarios = require('./usuarios');
const produtos = require('./produtos');

module.exports = app => {
    app
        .use(bodyParser.json())
        .use(cors({
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
            credentials: true
        }))
        .use('/usuarios', usuarios)
        .use('/produtos', produtos)
        .get('/', (req, res) => {
            res.status(200).json({ msg: 'Chapa Quente API' });
        });
}