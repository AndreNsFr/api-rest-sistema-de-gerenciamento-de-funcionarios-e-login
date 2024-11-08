import { Request, Response } from "express"
import { Istaff } from "../Models/Staff"
import StaffServices from "../Services/StaffServices"
import { CreateStaffSchema, DelSchema, GetSchema, UpdateStaffSchema } from "../schemas/StaffSchema"

const staffServices = new StaffServices

class StaffControllers {

    createStaff(req: Request, res: Response) {
        try {
            
            CreateStaffSchema.validate(req.body)

            staffServices.createStaff(req.body).then(() => {
                res.send("usuario criado com sucesso")
            }).catch(error => {
                res.send('ocorreu um erro:' + error)
            })
        } catch (error) {
            res.status(200)

            res.send('informações faltando')
            res.status(400)
        }

    }

    updateStaff(req: Request, res: Response) {

        

        try {
            UpdateStaffSchema.validate(req.body)

            GetSchema.validate(req.query.cpf)

            staffServices.updateStaff(req.body, req.query.cpf).then(usuario_alterado => {
                res.send(usuario_alterado)
                res.status(200)
            })
        } catch (error) {
            res.send('inforamções faltando')
            res.status(400)
        }
    }

    deleteStaff(req: Request, res: Response) {
        try {
            DelSchema.validate(req.query.cpf)
            staffServices.deleteStaff(req.query.cpf).then(Resultado_delete => {
                res.send(Resultado_delete)
                res.status(200)
            })
        } catch (error) {
            res.send('inforamções faltando')
            res.status(400)
        }
    }

    getStaff(req: Request, res: Response) {
        // ? no .then() se coloca dentro uma !!! arrow function !!! , é a mesma coisa que fazer .then(function exibirFuncionario(funcionario){  res.send(funcionario) })
        try {
            GetSchema.validate(req.query.cpf)
            staffServices.getStaff(req.query.cpf).then(funcionario => {
                res.send(funcionario)
            })
            res.status(200)
        } catch (error) {
            res.send('inforamções faltando')
            res.status(400)
        }
    }

}

export default StaffControllers

