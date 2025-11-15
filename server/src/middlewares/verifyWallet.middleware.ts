import { Request, Response, NextFunction } from "express";
import { verifyMessage } from "ethers"; // import trực tiếp
import { throwError } from "../utils/throwError";

interface WalletRequest extends Request {
  walletAddress?: string;
}

export const verifyWallet = (req: WalletRequest, res: Response, next: NextFunction) => {
  const { address, signature, message } = req.body;

  if (!address || !signature || !message) {
    return next(throwError("Missing wallet info", 400));
  }

  const recoveredAddress = verifyMessage(message, signature);
  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    return next(throwError("Invalid wallet signature", 403));
  }

  req.walletAddress = address;
  next();
};
