import { Router } from "express"
import { getAllEspaces, getEspaceById, createEspace, updateEspace, deleteEspace } from "../controllers/espace.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(authMiddleware)

router.get("/", getAllEspaces)
router.get("/:id", getEspaceById)
router.post("/", createEspace)
router.put("/:id", updateEspace)
router.delete("/:id", deleteEspace)

export default router
