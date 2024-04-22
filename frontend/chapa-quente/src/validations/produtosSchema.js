import * as yup from 'yup';

export const produtosSchema = yup.object().shape({
    id: yup
        .mixed()
        .nullable(),
    nome: yup
        .string()
        .max(20)
        .required('Insira um nome'),
    price: yup
        .number()
        .typeError('Insira um valor')
        .positive('Insira um valor maior que 0')
        .required('Insira um valor'),
    desc: yup
        .string()
        .max(255)
        .required('Insira uma descrição'),
    src: yup
        .mixed()
        .optional()
})