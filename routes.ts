import { Router, Response, Request } from "express";
import StaffControllers from "./src/Controllers/StaffController";
import authController from "./src/Controllers/authControler";


const staffController = new StaffControllers()
const authcontroller = new authController()
const router = Router()

router.post('/auth', authcontroller.Authenticate)
router.post('/auth/refresh', authcontroller.refreshToken)
router.post('/', staffController.createStaff)
router.get('/', staffController.getStaff)
router.put('/', staffController.updateStaff)
router.delete('/', staffController.deleteStaff)

export default router

