import { Router } from "express";
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

const token = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYW5kcmViYWNrdXAxMjA3QGdtYWlsLmNvbSIsImNwZiI6IjUwMTUzMzUxMTUifSwiaWF0IjoxNzMxMzUzMzQ4LCJleHAiOjE3MzEzNTY5NDh9.TedO_IZxuSG6lKPW8pZFHGTfURjH9EtoYeq_txkg3Cs","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYW5kcmViYWNrdXAxMjA3QGdtYWlsLmNvbSIsImNwZiI6IjUwMTUzMzUxMTUifSwiaWF0IjoxNzMxMzUzMzQ4LCJleHAiOjE3MzE0Mzk3NDh9.OREVh9h8S_vGZm4fdz9Tb5b4EbPtmiIRFgq9tMM8L-4"}