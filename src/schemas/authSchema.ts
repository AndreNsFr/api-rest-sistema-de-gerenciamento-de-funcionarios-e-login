import * as yup from 'yup'

export const autenticateSchema = yup.object().shape({
    email: yup.string().required(),
    cpf:yup.string().required(),
    senha: yup.string().min(8,"a senha precisa de no minimo 8 cacateres").required()
})

export const refreshToken = yup.object().shape({
    token: yup.string().required(),
    refreshToken: yup.string().required()
})

export type Irefresh = yup.InferType<typeof refreshToken>

export type Ipayload ={
    email:string,
    cpf:string
} 


export type Iauth  = yup.InferType<typeof autenticateSchema>