import express, { urlencoded } from "express";
import router from './routes'
import cors from 'cors'

const server = express()

server.use(express.json())
server.use(cors({
    origin: '*', // permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // todos os métodos comuns
    allowedHeaders: ['Content-Type', 'Authorization'], // define headers comuns
}));
server.use(urlencoded({ extended: true }));
server.use(router)


server.listen(process.env.PORT, () => { console.log('o servidor está ligado!!!') })