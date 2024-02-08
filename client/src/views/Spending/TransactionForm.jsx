import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button, Label, TextInput, Modal } from 'flowbite-react';
import { Formik, Form, Field, useField } from "formik"
import transactionSchema from "./yup/transactionSchema"
import DatePicker from "react-datepicker";
import CardRadio from "../../components/CardRadio";
import { config } from "../../Environment";

export default function TransactionForm({ wallets, userExpenses, userIncome, setTransactionsArr }) {

    const token = useSelector((state) => state.token);
    const URL = config.url
    const [transactionType, setTransactionType] = useState("expense");
    const isExpense = transactionType === "expense";
    const { _id } = useSelector((state) => state.user);
    const expenseCategoriesUnsorted = userExpenses.map((x) => x.category)
    const incomeCategoriesUnsorted = userIncome.map((x) => x.category)
    const RemoveDuplicates = (arr) => {
        return [...new Set(arr)]
    }
    const expenseCategories = RemoveDuplicates(expenseCategoriesUnsorted)
    const incomeCategories = RemoveDuplicates(incomeCategoriesUnsorted)

    const initialValuesTransaction = {
        label: "",
        category: "",
        newCategory: "",
        type: "",
        amount: "",
        wallet: wallets[0].name,
        date: new Date()
    }

    const addTransaction = async (values, onSubmitProps) => {
        values.type = isExpense ? "expense" : "income"
        let isNewCat = true
        if (values.newCategory === "") {
            isNewCat = false
        }
        values.category = isNewCat ? values.newCategory : values.category
        const addedTransactionResponse = await fetch(
            `${URL}/user/${_id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(
                    {
                        transaction: {
                            label: values.label,
                            category: values.category,
                            type: values.type,
                            amount: values.amount,
                            date: values.date,
                            wallet: values.wallet
                        }
                    }
                )
            }
        )
        const updatedTransactions = await addedTransactionResponse.json();
        setTransactionsArr(updatedTransactions)
        onSubmitProps.resetForm();
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await addTransaction(values, onSubmitProps);
        setOpenModal(false)

    };

    const handleRadioButtonChange = (e) => {
        setTransactionType(e.target.value);
    }


    const MyDatePicker = ({ name = "" }) => {
        const [field, meta, helpers] = useField(name);

        const { value } = meta;
        const { setValue } = helpers;

        return (
            <DatePicker
                {...field}
                selected={value}
                dateFormat={"dd/MM/yyyy"}
                onChange={(date) => setValue(date)}
            />
        );
    };

    /** MODAL LOGIC */
    const handleSubmit = () => {
        if (formRef.current) {

            formRef.current.handleSubmit()
        }
    }
    const formRef = useRef();
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="relative">
                <div className="absolute -top-6 right-44">
                    <Button className="fixed" type="submit" onClick={() => setOpenModal(true)}>Add Transaction</Button>
                </div>
            </div>
            <div className="flex">
                <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Add a new Transaction</Modal.Header>
                    <Modal.Body className="overflow-y-scroll">
                        <div className="space-y-6">
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValuesTransaction}
                                validationSchema={transactionSchema}
                                innerRef={formRef}
                            >
                                {({
                                    handleChange,
                                    handleBlur,
                                    values,
                                    errors,
                                    touched
                                }) => (
                                    <Form>
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <MyDatePicker name="date" />
                                            </div>
                                            <div>
                                                <CardRadio handleRadioButtonChange={handleRadioButtonChange} transactionType={transactionType} a={"expense"} b={"income"} />
                                            </div>
                                            <div>
                                                <Label htmlFor="amount" value="Amount of your Transaction" />
                                                <TextInput
                                                    value={values.amount}
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    placeholder="0"
                                                    step="0.01"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={errors.amount ?
                                                        (touched.amount ?
                                                            <span className="text-red-400 text-sm">{errors.amount}</span> :
                                                            null)
                                                        : null
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="wallet" value={isExpense ? "from Wallet" : "to Wallet"} />
                                                <Field as="select" id="wallet" value={values.wallet} onChange={handleChange} onBlur={handleBlur}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    {wallets.map((wallet) => (
                                                        <option key={wallet._id} value={wallet.name}>{wallet.name}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <div>
                                                <Label htmlFor="category" value="Select a Category" />
                                                <Field as="select" id="category" value={values.category} onChange={handleChange} onBlur={handleBlur}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Category</option>
                                                    {isExpense ?
                                                        expenseCategories.map((cat) => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))
                                                        :
                                                        incomeCategories.map((cat) => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                </Field>
                                            </div>
                                            <div>
                                                <Label htmlFor="newCategory" value="Or add a new Category" />
                                                <TextInput
                                                    value={values.newCategory}
                                                    id="newCategory"
                                                    name="newCategory"
                                                    type="text"
                                                    placeholder="food"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={errors.newCategory ?
                                                        (touched.newCategory ?
                                                            <span className="text-red-400 text-sm">{errors.newCategory}</span> :
                                                            null)
                                                        : null
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="label" value="Note" />
                                                <TextInput
                                                    value={values.label}
                                                    id="label"
                                                    name="label"
                                                    type="text"
                                                    placeholder="checkings"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={errors.label ?
                                                        (touched.label ?
                                                            <span className="text-red-400 text-sm">{errors.label}</span> :
                                                            null)
                                                        : null
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Button className="hidden" type="submit">Add Transaction</Button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik >

                        </div>
                    </Modal.Body>
                    <Modal.Footer className="flex justify-center py-2">
                        <Button onClick={() => {
                            handleSubmit()
                        }}>Add Transaction</Button>
                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}