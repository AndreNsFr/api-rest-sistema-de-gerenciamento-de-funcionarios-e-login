import { PrismaClient } from "@prisma/client";
import { Istaff } from "../Models/Staff";
import { Iauth } from "../schemas/authSchema";
import bcrypt from "bcrypt"
import { stat } from "fs";


const prisma = new PrismaClient()


class StaffRepository {

    async GetAllStaff() {
        try {
            const getAll = await prisma.funcionario.findMany()

            // remove a senha de todos, e como estou usando o foreach, irá passar um por um e deletar
            getAll.forEach(json_dentro_do_array => { delete json_dentro_do_array.senha })
            getAll.forEach(json_dentro_do_array => { delete json_dentro_do_array.id })

            if (!getAll) {
                throw new Error('sem retorno')
            }

            return getAll

        } catch (error) {
            console.log(error)
        }
    }

    async createStaff(info: Istaff) {
        try {

            const password = await bcrypt.hash(info.senha, 10)

            const Criar_funcionario = await prisma.funcionario.create({
                data: {
                    imagem: info.imagem,
                    cpf: info.cpf,
                    data: info.data,
                    departamento: info.departamento,
                    email: info.email,
                    telefone: info.telefone,
                    nome: info.nome,
                    senha: password
                }

            });

            if(!Criar_funcionario){
                return {status: "erro inesperado"}
            }

            return "funcionario criado com sucesso"

        }
        catch (error) {
            console.error(error)
            return {status: "funcionário já existente/ informações já existentes", error}
        }

    }

    async getStaff(data:string) {
        try {
            const show = await prisma.funcionario.findUnique({
                where: {
                    cpf: data
                }
            });

            delete show.id
            delete show.senha

            if (!show) {
                throw new Error('usuario não encontrado')
            }

            return show;

        } catch (error) {
            console.log(error)
        }
    }

    async verifyUser(data_login: Iauth) {
        try {

            const user_in_db = await prisma.funcionario.findUnique({
                where: {
                    email: data_login.email,
                    cpf: data_login.cpf
                }
            });

            if (!user_in_db) { // se o usuario nao for encotrado, entao esta errado as credenciais ( e no caso é true pois faltaria, e faltar é igual a false, e o ! inverte o valor da expressao, ou seja, se user_in_db for igual diferente de true (que é false) então fazer o comando abaixo)
                return false;// ?usuário não encontrado
            }

            const comparar = await bcrypt.compare(data_login.senha, user_in_db.senha)

            if (!comparar) { // se comparar for false fazer a linha de codigo abaixo
                return false // ?senha não corresponde
            }

            return true

        } catch (error) {
            throw new Error("Erro ao verificar usuário");
        }
    }

    async updateStaff(data: Istaff, cpf: string) {



        let password = undefined
        if (data.senha) {
            password = await bcrypt.hash(data.senha, 10)
        }


        try {
            const atualizar_funcionario = await prisma.funcionario.update({
                where: {
                    cpf: cpf
                }, data: {
                    senha: password ?? undefined,
                    departamento: data.departamento ?? undefined,
                    nome: data.nome ?? undefined,
                    telefone: data.telefone ?? undefined,
                    email: data.email ?? undefined,
                    imagem: data.imagem ?? undefined
                }
            });

            return {status:'funcionário atualizado'}
            

        } catch (error) {
            console.error(error)
        }
    }

    async deleteStaff(cpf:string) {
        try {
            const deleteStaff = await prisma.funcionario.delete({ where: { cpf: cpf } })

            return { status: "usuario removido do banco de dados." }

        } catch (error) {
            return { erro: error }
        }
    }


}

export default StaffRepository