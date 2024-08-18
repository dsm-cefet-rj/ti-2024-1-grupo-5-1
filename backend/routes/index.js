const bodyParser = require('body-parser');
const cors = require('cors');

// Rotas

const usuarios = require('./usuarios');

module.exports = app => {
  app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Chapa Quente API'});
  })
    .use(
      bodyParser.json(),
      cors(),
    )
    .use('/usuarios', usuarios);
}


