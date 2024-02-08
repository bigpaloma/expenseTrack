import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card"
import getUserData from "../../utils/getUser";
import TransactionForm from "../../components/TransactionForm";

export default function Spending() {

    /** USER LOGIC */
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [wallets, setWallets] = useState(user.wallets);
    const [transactionsArr, setTransactionsArr] = useState([...user.transactions].reverse())
    const userExpenses = transactionsArr.filter((x) => x.type === "expense")
    const userIncome = transactionsArr.filter((x) => x.type === "income")

    useEffect(() => {
        const getUsers = async () => {
            const data = await getUserData(user._id, token);
            setWallets(data.wallets);
            setTransactionsArr([...data.transactions].reverse());

        };

        getUsers();

        return () => {

        };
    }, [user._id, token]);

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-start py-10">
                <Card
                    dataArr={userExpenses}
                    setTransactionsArr={setTransactionsArr}
                    isExpense={true} />
                <TransactionForm
                    wallets={wallets}
                    userExpenses={userExpenses}
                    userIncome={userIncome}
                    setTransactionsArr={setTransactionsArr} />
            </div>
        </>
    )
}