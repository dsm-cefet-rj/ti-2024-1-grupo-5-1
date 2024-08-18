
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuarios = require('../models/usuarios');
const UserService = require('../services/usuarios');
require('dotenv').config();

class AuthController {
    static async login(req, res) {
        
        const { email, senha } = req.body;

        try {

            if (!email || !senha) {
                return res.status(400).send({ error: 'Dados insuficientes' });
            }

            const user = await Usuarios.findOne({ email });
            console.log(user);

            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            } else {
                console.log(senha, user.senha);
                const pass_ok = await bcrypt.compare(senha, user.senha);
                if (!pass_ok) return res.status(401).send({ error: 'Senha incorreta' });

                const { _id } = user;

                const token = jwt.sign({ id: _id }, process.env.SECRET, { expiresIn: 86400 });

                return res.status(200).send({ 
                    id: _id,
                    role: user.role,
                    token
                });
            }
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao buscar usuário' });
        }
    }

    static async register(req, res) {
        /*
            "users": [
                {
                    "id": "",
                    "nome": "",
                    "sobrenome": "",
                    "email": "",
                    "senha": "",
                    "telefone": "",
                    "logradouro": "",
                    "numero": "",
                    "complemento": "",
                    "bairro": "",
                    "cidade": "",
                    "cep": "",
                    "role": "",
                    "date": ""
                }
            ],
        */

        const { nome, sobrenome, email, senha, telefone, logradouro, numero, complemento, bairro, cidade, cep } = req.body;

        try {
            if (!UserService.validateEmail(email)) {
                return res.status(400).send({ error: 'E-mail inválido' });
            }

            if (await UserService.findEmail(email)) {
                return res.status(400).send({ error: 'E-mail já cadastrado' });
            }

            if (!nome || !sobrenome || !email || !senha || !telefone || !logradouro || !numero || !bairro || !cidade || !cep) {
                return res.status(400).send({ error: 'Dados insuficientes' });
            }

            const newUser = new Usuarios({
                nome,
                sobrenome,
                email,
                senha: await UserService.encryptPassword(senha),
                telefone,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                cep,
                role: 'user',
                date: new Date()
            });

            await newUser.save();
            console.log('Usuário cadastrado com sucesso', newUser);
            return res.status(201).send({ message: 'Usuário cadastrado com sucesso', status: true });
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao criar usuário', status: false });
        }

    }

    static async update(req, res) {
        const { id } = req.params;
        const { nome, sobrenome, email, old_senha, new_senha, telefone, logradouro, numero, complemento, bairro, cidade, cep } = req.body;

        try {
            if (!UserService.validateEmail(email)) {
                return res.status(400).send({ error: 'E-mail inválido' });
            }

            if (!nome || !sobrenome || !email || !old_senha || !telefone || !logradouro || !numero || !bairro || !cidade || !cep) {
                return res.status(400).send({ error: 'Dados insuficientes' });
            }

            const user = await User.findOne({_id: id});

            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            if (new_senha) {
                const pass_ok = bcrypt.compare(old_senha, user.senha);
                if (!pass_ok) {
                    return res.status(401).send({ error: 'Erro ao autenticar usuário' });
                }
                
                if (user.senha != old_senha) {
                    return res.status(401).send({ error: 'Senha antiga incorreta' });
                }

                user.senha = await UserService.encryptPassword(new_senha);
            }

            const newUser = {
                nome,
                sobrenome,
                email,
                senha,
                telefone,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                cep,
                role
            };

            await User.updateOne({_id: id}, newUser);

            return res.status(200).send({ message: 'Usuário atualizado com sucesso', status: true });
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao atualizar usuário', status: false });
        }
    }

    static async fetchMany(req, res) {
        try {
            const users = await Usuarios.find(); 
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }

    static async fetchOne(req, res) {
        const { id } = req.params;

        try {
            const user = await Usuarios.findOne({_id: id});

            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao buscar usuário' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const user = await Usuarios.findOne({_id: id});

            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            if (user.role === 'admin') {
                return res.status(401).send({ error: 'Usuário não pode ser deletado' });
            }

            await Usuarios.delete({_id: id});
            return res.status(200).send({ message: 'Usuário deletado com sucesso', status: true });
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao deletar usuário', status: false });
        }
    }
}

module.exports = AuthController;