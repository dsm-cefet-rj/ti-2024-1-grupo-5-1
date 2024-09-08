const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const AuthController = require('../controllers/auth');

router
    .post('/register', AuthController.register)
    .post('/login', AuthController.login)
    .patch('/update', auth, AuthController.update)
    .post('/delete', auth, AuthController.delete)
    .post('/logout', auth, AuthController.logout)
    .get('/fetch/', auth, AuthController.fetchMany)
    .get('/fetch/:id', auth, AuthController.fetchOne)

module.exports = router;