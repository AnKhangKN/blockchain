import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/throwError";

// Mở rộng Request để có user
interface AuthRequest extends Request {
  user?: {
    isAdmin?: boolean;
    isTeacher?: boolean;
    [key: string]: any;
  };
}

// Middleware kiểm tra quyền Admin
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) return next();
  return next(throwError("Người dùng không phải Admin!", 403));
};

// Middleware kiểm tra quyền Teacher
export const isTeacher = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.isTeacher) return next();
  return next(throwError("Người dùng không phải giảng viên!", 403));
};

// Middleware kiểm tra quyền Student (không phải Admin hay Teacher)
export const isUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.isTeacher && !req.user?.isAdmin) return next();
  return next(throwError("Không phải người dùng!", 403));
};
