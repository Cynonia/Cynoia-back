// src/routes/entity.routes.ts
import { Router } from "express";
import {
  createEntity,
  getAllEntities,
  getEntityById,
  updateEntity,
  deleteEntity,
} from "./../controllers/entities.controller.js";
import { authMiddleware } from "./../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Entities
 *   description: Entity management
 */

/**
 * @swagger
 * /api/v1/entities:
 *   post:
 *     tags: [Entities]
 *     summary: Create a new entity
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
 *         description: Entity created
 */
router.post("/", createEntity);

/**
 * @swagger
 * /api/v1/entities:
 *   get:
 *     tags: [Entities]
 *     summary: Get all entities
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of entities
 */
router.get("/", getAllEntities);

/**
 * @swagger
 * /api/v1/entities/{id}:
 *   get:
 *     tags: [Entities]
 *     summary: Get entity by id
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
 *         description: Entity object
 */
router.get("/:id", getEntityById);

/**
 * @swagger
 * /api/v1/entities/{id}:
 *   put:
 *     tags: [Entities]
 *     summary: Update an entity
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
 *         description: Entity updated
 */
router.put("/:id", updateEntity);

/**
 * @swagger
 * /api/v1/entities/{id}:
 *   delete:
 *     tags: [Entities]
 *     summary: Delete an entity
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
 *         description: Entity deleted
 */
router.delete("/:id", deleteEntity);

export default router;
