import { Router } from "express"
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "../controllers/role.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     tags: [Roles]
 *     summary: Get all roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get("/", getAllRoles)

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Get role by id
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
 *         description: Role object
 */
router.get("/:id", getRoleById)

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     tags: [Roles]
 *     summary: Create a new role
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
 *         description: Role created
 */
router.post("/", createRole)

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   put:
 *     tags: [Roles]
 *     summary: Update a role
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
 *         description: Role updated
 */
router.put("/:id", updateRole)

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Delete a role
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
 *         description: Role deleted
 */
router.delete("/:id", deleteRole)

export default router
