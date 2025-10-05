
import { Router } from "express"
import { getAllPaymentModes, getPaymentModeById, createPaymentMode, updatePaymentMode, deletePaymentMode } from "../controllers/paymentmode.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

/**
 * @swagger
 * tags:
 *   name: PaymentModes
 *   description: Payment mode management
 */

/**
 * @swagger
 * /api/v1/paymentmodes:
 *   get:
 *     tags: [PaymentModes]
 *     summary: Get all payment modes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payment modes
 */
router.get("/", getAllPaymentModes)

/**
 * @swagger
 * /api/v1/paymentmodes/{id}:
 *   get:
 *     tags: [PaymentModes]
 *     summary: Get payment mode by id
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
 *         description: Payment mode object
 */
router.get("/:id", getPaymentModeById)

/**
 * @swagger
 * /api/v1/paymentmodes:
 *   post:
 *     tags: [PaymentModes]
 *     summary: Create a new payment mode
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment mode created
 */
router.post("/", createPaymentMode)

/**
 * @swagger
 * /api/v1/paymentmodes/{id}:
 *   put:
 *     tags: [PaymentModes]
 *     summary: Update a payment mode
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
 *         description: Payment mode updated
 */
router.put("/:id", updatePaymentMode)

/**
 * @swagger
 * /api/v1/paymentmodes/{id}:
 *   delete:
 *     tags: [PaymentModes]
 *     summary: Delete a payment mode
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
 *         description: Payment mode deleted
 */
router.delete("/:id", deletePaymentMode)

export default router
