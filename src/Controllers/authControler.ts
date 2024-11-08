import { Request, Response, NextFunction } from "express";
import authService from "../Services/authService";
import { autenticateSchema } from "../schemas/authSchema";

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


    }

}

export default authController