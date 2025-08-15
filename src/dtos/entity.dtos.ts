import { createEntitySchema, updateEntitySchema } from "@/schemas/entity.schema";
import z from "zod";

export type CreateEntityDTO = z.infer<typeof createEntitySchema>;
export type UpdateEntityDTO = z.infer<typeof updateEntitySchema>;