import * as jwt from "jsonwebtoken"

(() => {

    // isso vem no req.headers.authorization ou algo do tipo
    const payload = {
        nome: "andré",
        idade: "16 anos",
        sexo: "masculino"
    }

    // geralmente se usa isso em dotenv
    const secret = "a55c6c1a-bfcf-4ca1-91b5-870b634a71f6"

    // acredito eu que tambem no dotenv ou em cookies, não sei
    const options = {
        expiresIn: '1h'
    }

    const token = jwt.sign(payload, secret, options)

    const decodeed = jwt.verify(token, secret)

    console.log(decodeed)


})()