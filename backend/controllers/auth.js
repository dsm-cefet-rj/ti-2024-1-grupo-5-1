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
            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            const pass_ok = await bcrypt.compare(senha, user.senha);
            if (!pass_ok) {
                return res.status(401).send({ error: 'Senha incorreta' });
            }

            const { _id, role } = user;
            const token = jwt.sign({ id: _id, role: role }, process.env.SESSION_SECRET, { expiresIn: '24h' });

            return res.status(200).send({
                token: token,
                user: {
                    id: _id,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    email: user.email,
                    telefone: user.telefone,
                    logradouro: user.logradouro,
                    numero: user.numero,
                    complemento: user.complemento,
                    bairro: user.bairro,
                    cidade: user.cidade,
                    cep: user.cep,
                    role: role,
                }
            });
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao buscar usuário' });
        }
    }

    static async register(req, res) {
        const { nome, sobrenome, email, senha, telefone, logradouro, numero, complemento, bairro, cidade, cep, role, date } = req.body;

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

            const hashedPassword = await UserService.encryptPassword(senha);

            const newUser = new Usuarios({
                nome,
                sobrenome,
                email,
                senha: hashedPassword,
                telefone,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                cep,
                role,
                date
            });

            await newUser.save();
            return res.status(201).send({ message: 'Usuário cadastrado com sucesso', status: true });
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao criar usuário', status: false });
        }
    }

    static async update(req, res) {
        const id = req.user_id;
        const { nome, sobrenome, email, old_senha, new_senha, telefone, logradouro, numero, complemento, bairro, cidade, cep } = req.body;

        try {
            if (!UserService.validateEmail(email)) {
                return res.status(400).send({ error: 'E-mail inválido' });
            }

            if (!nome || !sobrenome || !email || !old_senha || !telefone || !logradouro || !numero || !bairro || !cidade || !cep) {
                return res.status(400).send({ error: 'Dados insuficientes' });
            }

            const user = await Usuarios.findOne({ _id: id });
            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            const pass_ok = await bcrypt.compare(old_senha, user.senha);
            if (!pass_ok) {
                return res.status(401).send({ error: 'Senha incorreta' });
            } else {
                if (new_senha != '') {
                    user.senha = await UserService.encryptPassword(new_senha);
                } else {
                    user.senha = user.senha;
                }
            }

            user.nome = nome;
            user.sobrenome = sobrenome;
            user.email = email;
            user.telefone = telefone;
            user.logradouro = logradouro;
            user.numero = numero;
            user.complemento = complemento;
            user.bairro = bairro;
            user.cidade = cidade;
            user.cep = cep;

            await user.save();
            return res.status(200).send({ 
                message: 'Usuário atualizado com sucesso', 
                token: req.token,
                user: {
                    id: user._id,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    email: user.email,
                    telefone: user.telefone,
                    logradouro: user.logradouro,
                    numero: user.numero,
                    complemento: user.complemento,
                    bairro: user.bairro,
                    cidade: user.cidade,
                    cep: user.cep,
                    role: user.role,
                    date: user.date
                },
                status: true });
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
            const user = await Usuarios.findOne({ _id: id });

            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao buscar usuário' });
        }
    }

    static async delete(req, res) {
        const { id } = req.user_id; // Obtido do middleware de autenticação

        try {
            const user = await Usuarios.findOne({ _id: id });

            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            if (user.role === 'admin') {
                return res.status(401).send({ error: 'Usuário não pode ser deletado' });
            }

            await Usuarios.deleteOne({ _id: id });
            return res.status(200).send({ message: 'Usuário deletado com sucesso', status: true });
        } catch (error) {
            return res.status(500).send({ error: 'Erro ao deletar usuário', status: false });
        }
    }

    static async logout(req, res) {
        sessionStorage.removeItem('token');
    };

    // Método temporário para forçar a atualização de senha
    static async forceUpdatePassword(req, res) {
        const { id } = req.params;
        const { senha } = req.body;

        try {
            const user = await Usuarios.findOne({ _id: id });

            if (!user) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            user.senha = await UserService.encryptPassword(senha);

            await user.save();

            return res.status(200).send({ message: 'Senha atualizada com sucesso', status: true });

        } catch (error) {
            return res.status(500).send({ error: 'Erro ao atualizar senha', status: false });
        }

    }
}

module.exports = AuthController;
