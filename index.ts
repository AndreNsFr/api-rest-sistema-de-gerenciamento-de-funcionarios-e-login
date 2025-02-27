import express, { urlencoded } from "express";
import app from './routes'
import cors from 'cors'


const server = express()


server.use(express.json({ limit: '1gb' }));
server.use(cors({
    origin: '*', // permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // todos os métodos comuns
    allowedHeaders: ['Content-Type', 'Authorization', 'refresh_token'], // define headers comuns
}));
server.use(urlencoded({ extended: true, limit: '1gb' }));
server.use(app)


server.listen(process.env.PORT, () => { console.log('o servidor está ligado!!!') })