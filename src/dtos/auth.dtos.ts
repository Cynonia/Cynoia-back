import { loginSchema, registerSchema } from "./../schemas/auth.js";
import z from "zod";

export type RegisterDTO = z.infer<typeof registerSchema>;

export type LoginDTO = z.infer<typeof loginSchema>;
