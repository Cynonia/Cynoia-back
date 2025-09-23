import { Router } from "express"
import { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation, getReservationByEntityId } from "../controllers/reservation.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

router.get("/", getAllReservations)
router.get("/:id", getReservationById)
router.get("/entity/:id", getReservationByEntityId)
router.post("/", createReservation)
router.put("/:id", updateReservation)
router.delete("/:id", deleteReservation)

export default router
