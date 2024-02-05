import express from "express"
import {
    getUser,
    getUserWallets,
    addWallet,
    addTransaction,
    removeTransaction,
    removeWallet,
    getUserTransactions
} from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

/** READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/transactions", verifyToken, getUserTransactions);
router.get("/:id/wallets", verifyToken, getUserWallets);

/** UPDATE */
router.post("/:id", verifyToken, addTransaction);
router.post("/:id/wallets", verifyToken, addWallet);

/** DELETE */
router.delete("/:id/:trxId", verifyToken, removeTransaction);
router.delete("/:id/wallet/:walletId", verifyToken, removeWallet);

export default router;