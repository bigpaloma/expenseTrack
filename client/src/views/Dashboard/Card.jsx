import { useSelector } from "react-redux";

export default function Card({ setTransactionsArr, dataArr, isExpense }) {

    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const deleteTransaction = async (trx) => {
        const deletedTransactionResponse = await fetch(
            `http://localhost:4000/user/${_id}/${trx._id}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        const updatedTransactions = await deletedTransactionResponse.json();
        setTransactionsArr([...updatedTransactions])
    };

    const handleTransactionDelete = (trx) => {
        deleteTransaction(trx)
    }


    return (
        <>
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{isExpense ? "Latest Expenses" : "Latest Income"}</h5>
                </div>
                {<div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {dataArr.map((trx) => (
                            <li key={trx._id} className="py-3 sm:py-4">
                                <div className="flex justify-between items-center">
                                    <div className=" min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {trx.label} - {trx.category}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {trx.date}
                                        </p>
                                    </div>
                                    <div className="inline-flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {trx.amount}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {isExpense ? "from" : "to"} {trx.wallet}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <button onClick={() => handleTransactionDelete(trx)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>
        </>
    )
}