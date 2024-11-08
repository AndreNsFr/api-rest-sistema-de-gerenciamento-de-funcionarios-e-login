import * as yup from 'yup'

export const autenticateSchema = yup.object().shape({
    email: yup.string().required(),
    cpf:yup.string().required(),
    senha: yup.string().min(8,"a senha precisa de no minimo 8 cacateres").required()
})

export type Iauth  = yup.InferType<typeof autenticateSchema>