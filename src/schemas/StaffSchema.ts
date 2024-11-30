import * as Yup from 'yup';

export const GetSchema = Yup.string().required()

export const DelSchema = Yup.string().required()

export const CreateStaffSchema = Yup.object().shape({
    imagem: Yup.string().required(),
    nome: Yup.string().required(),
    senha: Yup.string().required(),
    cpf: Yup.string().required(),
    email: Yup.string().required(),
    data: Yup.string().required(),
    departamento: Yup.string().required()
}
)

export const UpdateStaffSchema = Yup.object().shape({
    imagem: Yup.string(),
    senha: Yup.string(),
    email: Yup.string(),
    departamento: Yup.string(),
    nome: Yup.string()
})  