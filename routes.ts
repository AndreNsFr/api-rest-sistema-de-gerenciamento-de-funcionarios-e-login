import { Response, Request, Router } from "express";
import StaffControllers from "./src/Controllers/StaffController";
import authController from "./src/Controllers/authControler";
import { authMiddleWare } from "./src/middlewares/authMiddleware";


const staffController = new StaffControllers()
const authcontroller = new authController()
const app = Router()



app.post('/auth', authcontroller.Authenticate)

// cria novo funcionário
app.post('/funcionarios', authMiddleWare, staffController.createStaff)

// pega um funcionário em especifico
app.get('/funcionarios', authMiddleWare, staffController.getStaff)

// pega todos os funcionários do banco
app.get('/staff', authMiddleWare, staffController.getAllStaff)

// atualiza os dados de um funcionário especifico
app.put('/funcionarios', authMiddleWare, staffController.updateStaff)

// deleta um usuario especifico
app.delete('/funcionarios', authMiddleWare, staffController.deleteStaff)

export default app

