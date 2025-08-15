import { Response } from "express";
import { sendError } from "./responseFormatter";

export const authorizeRole = (user: any, roles: string[], res: Response) => {
  if (!roles.includes(user.role)) {
    sendError(res, "Unauthorized: insufficient permissions", null, 403);
    return false;
  }
  return true;
};