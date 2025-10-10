
import { Router } from "express"
import { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction, getTransactionsByEntityId } from "../controllers/transaction.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */

/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: Get all transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/", getAllTransactions)
/**
 * @swagger
 * /api/v1/transactions/entity/{entityId}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get transactions by entity id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/entity/:entityId", getTransactionsByEntityId)

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get transaction by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction object
 */
router.get("/:id", getTransactionById)

/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     tags: [Transactions]
 *     summary: Create a new transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservationId:
 *                 type: integer
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post("/", createTransaction)

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   put:
 *     tags: [Transactions]
 *     summary: Update a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.put("/:id", updateTransaction)

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   delete:
 *     tags: [Transactions]
 *     summary: Delete a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete("/:id", deleteTransaction)

export default router
