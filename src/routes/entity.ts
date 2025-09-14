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

router.post("/", createEntity);
router.get("/", getAllEntities);
router.get("/:id", getEntityById);
router.put("/:id", updateEntity);
router.delete("/:id", deleteEntity);

export default router;
