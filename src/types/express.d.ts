import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        login: string;
        email: string;
        role: string;
        roleId: number;
      };
    }
  }
}