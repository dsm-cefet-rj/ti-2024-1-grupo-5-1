import * as yup from 'yup';

export const formSchemaC = yup.object().shape({
    nome: yup.string().required('Insira um nome.'),
    sobrenome: yup.string().required('Insira um sobrenome.'),
    email: yup.string().email().required('Insira um e-mail.').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Insira um e-mail válido.'),
    senha: yup.string().required('Insira uma senha.'),
    telefone: yup.string().required('Insira um telefone.').matches(/^\d{10,11}$/, 'Insira um telefone válido.'),
    logradouro: yup.string().required('Insira seu logradouro.'),
    numero: yup.string().required('Insira seu número.').matches(/^\d+$/, 'Insira um número válido.'),
    complemento: yup.string().notRequired('Insira seu complemento.'),
    bairro: yup.string().required('Insira seu bairro.'),
    cidade: yup.string().required('Insira sua cidade.'),
    cep: yup.string().required('Insira seu CEP.').matches(/^\d{8}$/, 'Insira um CEP válido.'),
    termos: yup.boolean().oneOf([true], 'Você deve aceitar nossos Termos de Serviço.')
});

export const formSchemaU = yup.object().shape({
    nome: yup.string().required('Insira um nome.'),
    sobrenome: yup.string().required('Insira um sobrenome.'),
    email: yup.string().email().required('Insira um e-mail.').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Insira um e-mail válido.'),
    old_senha: yup.string().required('Insira uma senha.'),
    new_senha: yup.string().notRequired('Insira uma senha.'),
    telefone: yup.string().required('Insira um telefone.').matches(/^\d{10,11}$/, 'Insira um telefone válido.'),
    logradouro: yup.string().required('Insira seu logradouro.'),
    numero: yup.string().required('Insira seu número.').matches(/^\d+$/, 'Insira um número válido.'),
    complemento: yup.string().notRequired('Insira seu complemento.'),
    bairro: yup.string().required('Insira seu bairro.'),
    cidade: yup.string().required('Insira sua cidade.'),
    cep: yup.string().required('Insira seu CEP.').matches(/^\d{8}$/, 'Insira um CEP válido.')
});

export const formSchemaR = yup.object().shape({
    email: yup.string().email().required('Insira um e-mail.').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Insira um e-mail válido.'),
    senha: yup.string().required('Insira uma senha.')
});