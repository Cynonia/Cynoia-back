import { Router } from "express"
import { getAllEquipements, getEquipementById, createEquipement, updateEquipement, deleteEquipement } from "../controllers/equipement.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

router.get("/", getAllEquipements)
router.get("/:id", getEquipementById)
router.post("/", createEquipement)
router.put("/:id", updateEquipement)
router.delete("/:id", deleteEquipement)

export default router
