import { Request, Response, NextFunction } from "express";

// Type cho custom error (optional)
interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error("[ERROR]:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Lỗi máy chủ nội bộ";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
