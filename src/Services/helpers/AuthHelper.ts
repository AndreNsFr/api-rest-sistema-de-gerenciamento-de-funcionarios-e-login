import jwt from 'jsonwebtoken'
import { Iauth } from '../../schemas/authSchema'

export const createJwt =  (payload:Iauth, expiresIn:string)=>{
    const options = {
        expiresIn : expiresIn
    }
    const token = jwt.sign({
        "data":{
        email : payload.email,
        cpf: payload.cpf
    }
    }, process.env.JWTS , options)
    
    return token
}