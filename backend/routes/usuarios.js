const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const AuthController = require('../controllers/auth.js');

router
    .post('/register', AuthController.register)
    .post('/login', AuthController.login)
    .patch('/update', auth, AuthController.update)
    .post('/delete', auth, AuthController.delete)
    .get('/fetch/', AuthController.fetchMany)
    .get('/fetch/:id', AuthController.fetchOne);

module.exports = router;