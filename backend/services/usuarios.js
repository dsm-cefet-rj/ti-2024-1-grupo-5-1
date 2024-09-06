const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');

class UserService {
    static async findEmail(email) {
        const user = await Usuarios.findOne({ email });
        return user ? true : false;
    }

    static validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    static async encryptPassword(senha) {
        if (!senha) {
            return null;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt);
        return hash;
    }
}

module.exports = UserService;
