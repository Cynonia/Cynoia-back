import { loginSchema, registerSchema } from "@/schemas";
import z from "zod";

export type RegisterDTO = z.infer<typeof registerSchema>;

export type LoginDTO = z.infer<typeof loginSchema>;
