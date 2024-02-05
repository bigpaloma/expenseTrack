import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    transactions: [],
    wallets: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setWallets: (state, action) => {
            state.wallets = action.payload.wallets;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload.transactions;
        },
        setWallet: (state, action) => {
            const updatedWallets = state.wallets.map((wallet) => {
                if (wallet._id === action.payload.wallet._id) return action.payload.wallet;
                return wallet;
            });
            state.wallets = updatedWallets;
        },
        setTransaction: (state, action) => {
            const updatedTransactions = state.transactions.map((transaction) => {
                if (transaction._id === action.payload.transaction._id) return action.payload.transaction;
                return transaction;
            });
            state.transactions = updatedTransactions;
        }
    },
});

export const { setMode, setLogin, setLogout, setWallets, setTransactions, setWallet, setTransaction } =
    authSlice.actions;
export default authSlice.reducer;