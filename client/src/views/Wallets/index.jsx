import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as yup from "yup"
import { Button, Card, Modal, Label, TextInput } from "flowbite-react";
import getUserData from "../../utils/getUser";

export default function Wallets() {

    /** USER LOGIC */
    const [wallets, setWallets] = useState([])
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);


    useEffect(() => {
        const getUsers = async () => {
            const data = await getUserData(_id, token);
            setWallets(data.wallets);
        };

        getUsers();

        return () => {

        };
    }, [_id, token]);


    /** FORM LOGIC */
    const walletSchema = yup.object().shape({
        name: yup.string().required("required"),
        balance: yup.number().required("required")
    });

    const initialValuesWallet = {
        name: "",
        balance: ""
    }

    const addWallet = async (values, onSubmitProps) => {
        const addedWalletResponse = await fetch(
            `https://expense-tracker-api-obou.onrender.com/user/${_id}/wallets`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(
                    {
                        wallet: {
                            name: values.name,
                            balance: values.balance
                        }
                    }
                )
            }
        )
        const updatedWallets = await addedWalletResponse.json();
        onSubmitProps.resetForm();
        setWallets(updatedWallets)
    };
    const handleFormSubmit = async (values, onSubmitProps) => {
        await addWallet(values, onSubmitProps);
    };

    const deleteWallet = async (wallet) => {
        const deletedWalletResponse = await fetch(
            `https://expense-tracker-api-obou.onrender.com/user/${_id}/wallet/${wallet._id}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        const updatedWallets = await deletedWalletResponse.json();
        setWallets([...updatedWallets])
    };
    const handleWalletDelete = (trx) => {
        deleteWallet(trx)
    }

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
            <div className="text-center mt-10 flex justify-center relative">
                <div className="w-fit text-4xl font-bold sm:relative">
                    <h1>Your Wallets</h1>
                    <div className="absolute z-10 left-7 -top-10 sm:top-0 sm:left-64">
                        <Button className="fixed" onClick={() => setOpenModal(true)}>Add Wallet</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="max-w-[80vw] h-content mt-4 flex flex-wrap justify-center items-center">
                    {wallets.length > 0 ?
                        wallets.map((wallet) => (
                            <Card key={wallet._id} className="max-w-[40%] min-w-[330px] m-[1px] sm:m-2">
                                <div className="flex justify-between">
                                    <h5 className="text-2xl font-bold tracking-tight text-orange-400 dark:text-orange-400">
                                        {wallet.name} <span className="text-lg ml-2 text-gray-400">CHF</span>
                                    </h5>
                                </div>
                                <div className="flex relative justify-center mr-5 text-5xl font-bold text-gray-700 dark:text-white">
                                    <p >
                                        {wallet.balance}
                                    </p>
                                    <Button className="absolute -top-12 right-0" color="failure" size="sm" onClick={() => handleWalletDelete(wallet)}>
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        )) : <p>Please Log in</p>}
                </div>
            </div>
            <div className="flex">
                <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Add a new Wallet</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValuesWallet}
                                validationSchema={walletSchema}
                                innerRef={formRef}
                            >
                                {({
                                    handleChange,
                                    handleBlur,
                                    values,
                                    errors,
                                    touched
                                }) => (
                                    <Form className="flex flex-col sm:gap-1 lg:gap-4">
                                        <>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="name" value="Wallet Name" />
                                                </div>
                                                <TextInput
                                                    value={values.name}
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="savings"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={errors.name ?
                                                        (touched.name ?
                                                            <span className="text-red-400 text-sm">{errors.name}</span> :
                                                            null)
                                                        : null
                                                    }
                                                    required />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="balance" value="Initial Balance" />
                                                </div>
                                                <TextInput
                                                    value={values.balance}
                                                    id="balance"
                                                    name="balance"
                                                    type="number"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={errors.balance ?
                                                        (touched.balance ?
                                                            <span className="text-red-400 text-sm">{errors.balance}</span> :
                                                            null)
                                                        : null
                                                    }
                                                    required />
                                            </div>
                                            <div>
                                                <Button className="hidden" type="submit">Add Wallet</Button>
                                            </div>
                                        </>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            setOpenModal(false)
                            handleSubmit()
                        }}>Add Wallet</Button>
                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}