import express from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyWallet } from "../../middlewares/verifyWallet.middleware";
import { linkWalletController } from "../../controllers/shared/WalletControllers";

const router = express.Router();

router.post("/link-wallet", verifyToken, verifyWallet, linkWalletController);

export default router;
