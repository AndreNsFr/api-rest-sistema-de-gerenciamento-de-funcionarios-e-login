import { Request, Response, NextFunction } from "express";
import authService from "../Services/authService";
import { autenticateSchema, refreshToken } from "../schemas/authSchema";

const authservice = new authService()

class authController {

    async Authenticate(req: Request, res: Response) {

        try {
            const dados_validados = await autenticateSchema.validate(req.body, { stripUnknown: true })

            authservice.Authenticate(dados_validados).then((dados) => {
                res.send(dados)
            })



        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {


            const dados_validados = await refreshToken.validate(req.body, { stripUnknown: true })

            authservice.Refresh(dados_validados).then((status) => {
                res.send(status)
            })


        } catch (error) {

        }


    }

}

export default authController