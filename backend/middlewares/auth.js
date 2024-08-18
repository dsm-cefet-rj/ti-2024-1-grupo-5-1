const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token_header = req.headers.auth;

    if (!token_header) {
        return res.status(401).send({ error: 'Token não enviado' });
    }

    const [, token] = token_header.split(' ');

    jwt.verify(token, process.env.SECRET, (error, data) => {
        if (error) {
            return res.status(401).send({ error: 'Falha na autenticação do token' });
        } else {
            req.user_id = data.id;
            req.token = token;
            return next();
        }
    });
}

module.exports = auth;