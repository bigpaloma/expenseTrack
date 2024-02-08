import React from "react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Card from "./Card";
import getUserData from "../../utils/getUser";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {

    /** USER LOGIC */
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [transactionsArr, setTransactionsArr] = useState([...user.transactions].reverse())
    const userExpenses = transactionsArr.filter((x) => x.type === "expense")
    const userIncome = transactionsArr.filter((x) => x.type === "income")


    useEffect(() => {
        const getUsers = async () => {
            const data = await getUserData(user._id, token);
            setTransactionsArr([...data.transactions].reverse());

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
            <div className="text-center mt-10">
                <h1 className="font-bold text-6xl">Dashboard</h1>
            </div>
            <div className="max-w-screen flex flex-col lg:flex-row items-center lg:items-start justify-center gap-3">
                <Card
                    dataArr={userExpenses}
                    setTransactionsArr={setTransactionsArr}
                    isExpense={true} />
                <Card
                    dataArr={userIncome}
                    setTransactionsArr={setTransactionsArr}
                    isExpense={false} />
            </div>
        </>
    )
}

