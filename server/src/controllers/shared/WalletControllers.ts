import { Request, Response, NextFunction } from "express";
import { linkWalletService } from "../../services/shared/UserServices";
import { throwError } from "../../utils/throwError";

interface AuthRequest extends Request {
  user?: {
    id: string;
    isAdmin?: boolean;
    isTeacher?: boolean;
  };
  walletAddress?: string;
}

export const linkWalletController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const walletAddress = req.walletAddress;

    if (!userId || !walletAddress) {
      return next(throwError("Missing user or wallet info", 400));
    }

    const user = await linkWalletService(userId, walletAddress);

    return res.status(200).json({
      success: true,
      message: "Liên kết ví thành công!",
      data: {
        id: user._id,
        fullName: user.fullName,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error: any) {
    return next(error);
  }
};