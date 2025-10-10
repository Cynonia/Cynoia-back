
import { Router } from "express"
import { getAllEquipements, getEquipementById, createEquipement, updateEquipement, deleteEquipement, getEquipementsByEntityId } from "../controllers/equipement.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

/**
 * @swagger
 * tags:
 *   name: Equipements
 *   description: Equipement management
 */

/**
 * @swagger
 * /api/v1/equipements:
 *   get:
 *     tags: [Equipements]
 *     summary: Get all equipements
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of equipements
 */
router.get("/", getAllEquipements)
/**
 * @swagger
 * /api/v1/equipements/entity/{entityId}:
 *   get:
 *     tags: [Equipements]
 *     summary: Get equipements by entity id
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
 *         description: List of equipements
 */
router.get("/entity/:entityId", getEquipementsByEntityId)

/**
 * @swagger
 * /api/v1/equipements/{id}:
 *   get:
 *     tags: [Equipements]
 *     summary: Get equipement by id
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
 *         description: Equipement object
 */
router.get("/:id", getEquipementById)

/**
 * @swagger
 * /api/v1/equipements:
 *   post:
 *     tags: [Equipements]
 *     summary: Create a new equipement
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
 *               price:
 *                 type: number
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: Equipement created
 */
router.post("/", createEquipement)

/**
 * @swagger
 * /api/v1/equipements/{id}:
 *   put:
 *     tags: [Equipements]
 *     summary: Update an equipement
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
 *         description: Equipement updated
 */
router.put("/:id", updateEquipement)

/**
 * @swagger
 * /api/v1/equipements/{id}:
 *   delete:
 *     tags: [Equipements]
 *     summary: Delete an equipement
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
 *         description: Equipement deleted
 */
router.delete("/:id", deleteEquipement)

export default router
