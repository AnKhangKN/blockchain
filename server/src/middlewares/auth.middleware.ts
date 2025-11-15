import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { throwError } from "../utils/throwError";
import config from "../config/env";

// Mở rộng interface Request để thêm user
interface AuthRequest extends Request {
  user?: any; // Có thể define interface chi tiết hơn nếu muốn
}

// Hàm tách token từ header
const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  return authHeader.split(" ")[1].replace(/"/g, "");
};

// Middleware xác thực token
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = extractToken(req);

  if (!token) return next(throwError("Token không tồn tại!", 401));

  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(throwError("Token không hợp lệ hoặc đã hết hạn!", 403));
  }
};
