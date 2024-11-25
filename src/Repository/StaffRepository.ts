import { PrismaClient } from "@prisma/client";
import express, { json, response, Response } from "express";
import { Istaff } from "../Models/Staff";
import { Iauth } from "../schemas/authSchema";
import bcrypt from "bcrypt"


const prisma = new PrismaClient()


class StaffRepository {

    async createStaff(info: Istaff) {
        try {

            const password = await bcrypt.hash(info.senha, 10)

            const Criar_funcionario = await prisma.funcionario.create({
                data: {
                    cpf: info.cpf,
                    data: info.data,
                    departamento: info.departamento,
                    email: info.email,
                    nome: info.nome,
                    senha: password
                }
            });

        }
        catch (error) {
            console.error(error)
        }

    }

    async getStaff(data) {
        try {
            const show = await prisma.funcionario.findUnique({
                where: {
                    cpf: data
                }
            });

            if (!show) {
                throw new Error('usuario não encontrado')
            }

            return show;

        } catch (error) {

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

        const password = await bcrypt.hash(data.senha, 10)


        try {
            const atualizar_funcionario = await prisma.funcionario.update({
                where: {
                    cpf: cpf
                }, data: {
                    senha: password ?? undefined,
                    departamento: data.departamento ?? undefined,
                    nome: data.nome ?? undefined,
                    email: data.email ?? undefined
                }
            });

            return atualizar_funcionario

        } catch (error) {
            console.error(error)
        }
    }

    async deleteStaff(cpf) {
        try {
            const deleteStaff = await prisma.funcionario.delete({ where: { cpf: cpf } })

            return 'usuario removido do banco de dados.'

        } catch (error) {
            return 'o usuario não encontrado'
        }
    }


}

export default StaffRepository