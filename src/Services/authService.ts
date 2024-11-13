import { decode } from "jsonwebtoken"
import StaffRepository from "../Repository/StaffRepository"
import { Iauth, Irefresh, refreshToken } from "../schemas/authSchema"
import { createJwt, validateToken, decodeToken } from "./helpers/AuthHelper"

const staffRepository = new StaffRepository()

class authService {

    async Authenticate(data: Iauth) {

        return await staffRepository.verifyUser(data).then((status_verificação) => {

            if (status_verificação) {
                const token = createJwt(data, process.env.jtw_expiresIn)

                const refreshToken = createJwt(data, process.env.refreshToken_expiresIn)

                return { token, refreshToken }
            } else {
                return { erro: 'cpf e/ou senha errados' }
            }

        }).catch(() => {
            return { erro: "dados invalidos" }
        })

    }

    async Refresh(data: Irefresh) {

        try {

            const validate_token = validateToken(data.token)
            const validate_refreshToken = validateToken(data.refreshToken)

            if (validate_token && validate_refreshToken) {
                return { status: "autenticação bem sucedida" }
            }
            if (validate_token == false && validate_refreshToken == true) {

                const payload = decodeToken(data.refreshToken)

                const { email, cpf } = payload //! desistruturação do json (é para tirar o iat e o exp)

                const token = createJwt({ email, cpf }, process.env.jtw_expiresIn)
                const refreshToken = createJwt({ email, cpf }, process.env.refreshToken_expiresIn)

                return { token, refreshToken }

            }

            throw new Error('autenticação expirada')

        } catch (error) {
            return error.message
        }

    }

}


export default authService