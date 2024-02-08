import React from "react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Card from "./Card";
import TransactionForm from "../../components/TransactionForm";
import getUserData from "../../utils/getUser";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {

    /** USER LOGIC */
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [wallets, setWallets] = useState([])
    const [transactionsArr, setTransactionsArr] = useState([...user.transactions].reverse())
    const userExpenses = transactionsArr.filter((x) => x.type === "expense")
    const userIncome = transactionsArr.filter((x) => x.type === "income")


    useEffect(() => {
        const getUsers = async () => {
            const data = await getUserData(user._id, token);
            setTransactionsArr([...data.transactions].reverse());
            setWallets([...data.wallets])
        };

        getUsers();

        return () => {

        };
    }, [user._id, token]);

    if (!user) {
        return null;
    }

    return (
        <>
            <div className="mt-10 max-w-screen flex flex-col lg:flex-row items-center lg:items-start justify-center gap-3">
                <Card
                    dataArr={userExpenses}
                    setTransactionsArr={setTransactionsArr}
                    isExpense={true} />
                <Card
                    dataArr={userIncome}
                    setTransactionsArr={setTransactionsArr}
                    isExpense={false} />
                <TransactionForm
                    wallets={wallets}
                    userExpenses={userExpenses}
                    userIncome={userIncome}
                    setTransactionsArr={setTransactionsArr} />
            </div>
        </>
    )
}

