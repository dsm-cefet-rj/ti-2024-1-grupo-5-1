const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token_header = req.headers.authorization;

    if (!token_header) {
        return res.status(401).send({ error: 'Token não fornecido.' });
    }

    const [, token] = token_header.split(' ');

    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token inválido.' });
        } else {
            req.user_id = decoded.id;
            req.user_role = decoded.role;
            req.token = token;
            return next();
        }
    });
}

module.exports = auth;