import jwt from "jsonwebtoken";
import { throwError } from "../utils/throwError";
import config from "../config/env";

// Payload type
interface JwtPayload {
  id: string;
  isAdmin?: boolean;
  isTeacher?: boolean;
}

// Tạo access token
export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: "30s",
  });
};

// Tạo refresh token
export const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: "365d",
  });
};

// Xử lý refresh token
export const handleRefreshToken = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as JwtPayload;

    const accessToken = generateAccessToken({
      id: decoded.id,
      isAdmin: decoded.isAdmin,
      isTeacher: decoded.isTeacher,
    });

    return {
      status: "OK",
      message: "Lấy token thành công!",
      accessToken,
    };
  } catch (error: any) {
    throwError(
      error.message || "Refresh token không hợp lệ hoặc đã hết hạn",
      401
    );
  }
};
