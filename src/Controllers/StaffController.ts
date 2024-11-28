import { Request, Response } from "express"
import { Istaff } from "../Models/Staff"
import StaffServices from "../Services/StaffServices"
import { CreateStaffSchema, DelSchema, GetSchema, UpdateStaffSchema } from "../schemas/StaffSchema"

const staffServices = new StaffServices

class StaffControllers {


    getAllStaff(req: Request, res: Response) {

        try {
            staffServices.GetAllStaff().then((x) => {
                res.send(x).status(200)
            }).catch((error) => {
                res.send({ erro: error })
            })
        } catch (error) {
            res.send(error)
        }

    }

    createStaff(req: Request, res: Response) {
        try {

            CreateStaffSchema.validate(req.body)

            staffServices.createStaff(req.body).then(() => {
                res.send("usuario criado com sucesso")
            }).catch(error => {
                res.send('ocorreu um erro:' + error)
            })
        } catch (error) {
            res.json({ erro: error })
            res.status(400)
        }

    }



    updateStaff(req: Request, res: Response) {



        try {
            UpdateStaffSchema.validate(req.body)

            GetSchema.validate(req.query.cpf)

            staffServices.updateStaff(req.body, req.query.cpf).then(usuario_alterado => {
                if (usuario_alterado !== undefined) {
                    res.send(usuario_alterado).status(200)
                } else {
                    res.json({ erro: 'usuario não entrado para update' })
                }
            })
        } catch (error) {
            res.json({ erro: error })
            res.status(400)
        }
    }

    // TODO: colocar a logica do getStaff de retornar error para o front 

    deleteStaff(req: Request, res: Response) {
        try {
            DelSchema.validate(req.query.cpf)
            staffServices.deleteStaff(req.query.cpf).then(Resultado_delete => {
                if (Resultado_delete !== undefined) {
                    res.send(Resultado_delete).status(200)
                } else {
                    res.json({ erro: 'usuario não encotrado no banco de dados' }).status(400)
                }
            })
        } catch (error) {
            res.json({ erro: error })
            res.status(400)
        }
    }

    getStaff(req: Request, res: Response) {
        // ? no .then() se coloca dentro uma !!! arrow function !!! , é a mesma coisa que fazer .then(function exibirFuncionario(funcionario){  res.send(funcionario) })
        try {
            GetSchema.validate(req.query.cpf)
            staffServices.getStaff(req.query.cpf).then(funcionario => {
                if (funcionario !== undefined) {
                    res.send(funcionario).status(200)
                } else {
                    res.json({ erro: "funcionario não encontrado" }).status(400)
                }
            })
        } catch (error) {
            res.json({ erro: error }).status(400)
        }
    }

}

export default StaffControllers

