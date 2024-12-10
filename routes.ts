import { Router, Response, Request } from "express";
import StaffControllers from "./src/Controllers/StaffController";
import authController from "./src/Controllers/authControler";
import { authMiddleWare } from "./src/middlewares/authMiddleware";


const staffController = new StaffControllers()
const authcontroller = new authController()
const router = Router()

router.post('/auth', authcontroller.Authenticate)

router.post('/auth/refresh', authcontroller.refreshToken)

// cria novo funcionário
router.post('/', authMiddleWare, staffController.createStaff)

// pega um funcionário em especifico
router.get('/', authMiddleWare, staffController.getStaff)

// pega todos os funcionários do banco
router.get('/staff', authMiddleWare, staffController.getAllStaff)

// atualiza os dados de um funcionário especifico
router.put('/', authMiddleWare, staffController.updateStaff)

// deleta um usuario especifico
router.delete('/', authMiddleWare, staffController.deleteStaff)

export default router

