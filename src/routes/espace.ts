
import { Router } from "express"
import { getAllEspaces, getEspaceById, createEspace, updateEspace, deleteEspace, getEspacesByEntityId } from "../controllers/espace.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

/**
 * @swagger
 * tags:
 *   name: Espaces
 *   description: Espaces management
 */

/**
 * @swagger
 * /api/v1/espaces:
 *   get:
 *     tags: [Espaces]
 *     summary: Get all espaces
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of espaces
 */
router.get("/", getAllEspaces)
/**
 * @swagger
 * /api/v1/espaces/entity/{entityId}:
 *   get:
 *     tags: [Espaces]
 *     summary: Get espaces by entity id
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
 *         description: List of espaces
 */
router.get("/entity/:entityId", getEspacesByEntityId)

/**
 * @swagger
 * /api/v1/espaces/{id}:
 *   get:
 *     tags: [Espaces]
 *     summary: Get espace by id
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
 *         description: Espace object
 */
router.get("/:id", getEspaceById)

/**
 * @swagger
 * /api/v1/espaces:
 *   post:
 *     tags: [Espaces]
 *     summary: Create a new espace
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
 *               entityId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Espace created
 */
router.post("/", createEspace)

/**
 * @swagger
 * /api/v1/espaces/{id}:
 *   put:
 *     tags: [Espaces]
 *     summary: Update an espace
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
 *         description: Espace updated
 */
router.put("/:id", updateEspace)

/**
 * @swagger
 * /api/v1/espaces/{id}:
 *   delete:
 *     tags: [Espaces]
 *     summary: Delete an espace
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
 *         description: Espace deleted
 */
router.delete("/:id", deleteEspace)

export default router
