import { Request, Response, NextFunction } from "express";
import authService from "../Services/authService"

const auth_service = new authService

export const authMiddleWare = async (Req: Request, Res: Response, Next: NextFunction) => {

    const { authorization, refresh_token } = Req.headers

    if (authorization && refresh_token) {
        await auth_service.Refresh({ token: authorization, refreshToken: refresh_token as string }).then((status) => {
            if (status.status === "valido") {
                Next();
            }
            else if (status.status === "refreshToken valido") {
                // necessario para o front poder ver o header
                Res.set("Access-Control-Expose-Headers", "token, refreshToken");

                Res.set("token", status.token)
                Res.set("refreshToken", status.refreshToken)
                Next();
            } else {
                Res.send({ erro: "não autorizado" }).status(405)
            }
        })
    } else {
        Res.status(405)
    }

}