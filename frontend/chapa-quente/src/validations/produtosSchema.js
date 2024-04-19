import * as yup from 'yup';

export const produtosSchema = yup.object().shape({
    nome: yup
        .string()
        .max(20)
        .required(),
    price: yup
        .number()
        .positive()
        .required(),
    desc: yup
        .string()
        .max(255)
        .required(),
    src: yup
        .mixed().
        required()
})