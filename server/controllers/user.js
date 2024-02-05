import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

/** READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("transactions")
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserTransactions = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user.transactions);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserWallets = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user.wallets);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


/** UPDATE */
export const addWallet = async (req, res) => {
    try {
        const { id } = req.params;
        const wallet = req.body.wallet
        await User.findByIdAndUpdate(id, { $push: { wallets: wallet } }).populate("wallets")
        const user = await User.findById(id)
        res.status(200).json(user.wallets);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const addTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = new Transaction(req.body.transaction)
        transaction.owner = id
        const user = await User.findById(id)
        user.transactions.push(transaction)
        const walletIdx = user.wallets.findIndex((wallet) => wallet.name === transaction.wallet);
        const userwallet = user.wallets[walletIdx]
        if (transaction.type === "expense") {
            userwallet.balance = userwallet.balance - transaction.amount
        } else { userwallet.balance = userwallet.balance + transaction.amount }
        await transaction.save()
        await user.save()
        //const updatedUser = await User.findById(id).populate({ path: "transactions", populate: { path: "owner" } }).populate("owner");
        const userTransactionsSorted = await Transaction.find({ owner: id }).sort({ _id: -1 })
        res.status(200).json(userTransactionsSorted);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
    //await trans.find({id:id}).sort("createdAt")
}

/** DELETE */
export const removeTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { trxId } = req.params;
        const user = await User.findById(id)
        const deletedTrx = await Transaction.findByIdAndDelete(trxId)
        const walletIdx = user.wallets.findIndex((wallet) => wallet.name === deletedTrx.wallet);
        if (walletIdx) {
            const userwallet = user.wallets[walletIdx];
            if (deletedTrx.type === "expense") {
                userwallet.balance = userwallet.balance + deletedTrx.amount
            } else { userwallet.balance = userwallet.balance - deletedTrx.amount }
        }
        await User.findByIdAndUpdate(id, { $pull: { transactions: trxId } })
        user.save();
        const userTransactionsSorted = await Transaction.find({ owner: id }).sort({ _id: -1 })
        res.status(200).json(userTransactionsSorted);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const removeWallet = async (req, res) => {
    try {
        const { id } = req.params;
        const { walletId } = req.params;
        await User.findByIdAndUpdate(id, { $pull: { wallets: { _id: walletId } } })
        const user = await User.findById(id)
        res.status(200).send(user.wallets)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}