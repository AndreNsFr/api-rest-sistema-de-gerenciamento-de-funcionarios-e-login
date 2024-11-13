import jwt from 'jsonwebtoken'
import { Iauth, Irefresh,Ipayload } from '../../schemas/authSchema'

export const createJwt = (payload: Iauth, expiresIn: string): string => {
    const options = {
        expiresIn: expiresIn
    }
    const token = jwt.sign({
        email: payload.email,
        cpf: payload.cpf
    }, process.env.JWTS, options)

    return token
}

export const validateToken = (token: string): boolean => {
    try {
        jwt.verify(token, process.env.JWTS)
        return true
    } catch (error) {
        return false
    }
}

export const decodeToken = (token: string):any => {
    const decode = jwt.decode(token)
    return decode
}