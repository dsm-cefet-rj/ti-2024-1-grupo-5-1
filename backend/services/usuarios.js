const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');

class UserService {
    static async findEmail(email) {
        const user = await Usuarios.findOne({ email });
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    static async validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isValid = re.test(email);
        if (isValid) {
            return true;
        } else {
            return false;
        }
    }

    static async encryptPassword(password) {
        if (!password) {
            return null;
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

}

module.exports = UserService;

