import { Router } from "express"
import { getAllPaymentModes, getPaymentModeById, createPaymentMode, updatePaymentMode, deletePaymentMode } from "../controllers/paymentmode.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

router.get("/", getAllPaymentModes)
router.get("/:id", getPaymentModeById)
router.post("/", createPaymentMode)
router.put("/:id", updatePaymentMode)
router.delete("/:id", deletePaymentMode)

export default router
