import StaffRepository from "../Repository/StaffRepository"
import { Iauth } from "../schemas/authSchema"
import { createJwt } from "./helpers/AuthHelper"

const staffRepository = new StaffRepository()

class authService {

    async Authenticate(data: Iauth) {

        return await staffRepository.verifyUser(data).then((status_verificação) => {

            if (status_verificação) {
                const token = createJwt(data, process.env.jtw_expiresIn)

                const refreshToken = createJwt(data, process.env.refreshToken_expiresIn)

                return { token, refreshToken }
            }

        }).catch(() => {
            return { erro: "dados invalidos" }
        })

    }

}


export default authService