import { Router } from "express"
import { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } from "../controllers/transaction.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

router.get("/", getAllTransactions)
router.get("/:id", getTransactionById)
router.post("/", createTransaction)
router.put("/:id", updateTransaction)
router.delete("/:id", deleteTransaction)

export default router
