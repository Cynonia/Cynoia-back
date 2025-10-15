import { Router } from "express"
import { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation, getReservationByEntityId, validateReservation, refuseReservation, getReservationsByUserId } from "../controllers/reservation.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservation management and equipment attachments
 */


const router = Router()

router.use(authMiddleware)

/**
 * @swagger
 * /api/v1/reservations:
 *   get:
 *     tags: [Reservations]
 *     summary: Get all reservations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reservations
 */
router.get("/", getAllReservations)
/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get reservation by id
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
 *         description: Reservation object
 */
router.get("/:id", getReservationById)
/**
 * @swagger
 * /api/v1/reservations/entity/{id}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get reservations by entity id
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
 *         description: List of reservations for an entity
 */
router.get("/entity/:id", getReservationByEntityId)

/**
 * @swagger
 * /api/v1/reservations/user/{userId}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get reservations by user id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reservations for a user
 */
router.get("/user/:userId", getReservationsByUserId)
/**
 * @swagger
 * /api/v1/reservations:
 *   post:
 *     tags: [Reservations]
 *     summary: Create a reservation (optionally attach equipements)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservationDate:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               status:
 *                 type: string
 *               espacesId:
 *                 type: integer
 *               equipements:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     equipementId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *                     state:
 *                       type: string
 *     responses:
 *       201:
 *         description: Reservation created
 */
router.post("/", createReservation)
/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   put:
 *     tags: [Reservations]
 *     summary: Update reservation
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
 *         description: Reservation updated
 */
router.put("/:id", updateReservation)
/**
 * @swagger
 * /api/v1/reservations/{id}/validate:
 *   post:
 *     tags: [Reservations]
 *     summary: Validate a reservation (ADMIN/MANAGER only)
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
 *         description: Reservation validated
 */
router.post("/:id/validate", validateReservation)
/**
 * @swagger
 * /api/v1/reservations/{id}/refuse:
 *   post:
 *     tags: [Reservations]
 *     summary: Refuse a reservation (ADMIN/MANAGER only)
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
 *         description: Reservation refused
 */
router.post("/:id/refuse", refuseReservation)
/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   delete:
 *     tags: [Reservations]
 *     summary: Delete a reservation
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
 *         description: Reservation deleted
 */
router.delete("/:id", deleteReservation)

export default router
