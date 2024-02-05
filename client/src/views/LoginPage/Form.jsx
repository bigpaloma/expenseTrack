import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { loginSchema } from "./yup/loginSchema";
import { registerSchema } from "./yup/registerSchema";
import { Button, Label, TextInput } from 'flowbite-react';

const LoginForm = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register"

    const initialValuesRegister = {
        username: "",
        password: "",
        wallet: "",
        balance: 0,
    };

    const initialValuesLogin = {
        username: "",
        password: "",
    };

    const register = async (values, onSubmitProps) => {
        const savedUserResponse = await fetch(
            "https://expense-tracker-api-obou.onrender.com/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        user: {
                            username: values.username,
                            password: values.password,
                            wallets: [
                                {
                                    name: values.wallet,
                                    balance: values.balance
                                }
                            ]

                        }
                    }
                )
            }
        )
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm()

        if (savedUser) {
            setPageType("login")
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "https://expense-tracker-api-obou.onrender.com/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        )
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm()

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/Dashboard")
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="grow">
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                        validationSchema={isLogin ? loginSchema : registerSchema}
                        className
                    >
                        {({
                            handleChange,
                            handleBlur,
                            resetForm,
                            values,
                            errors,
                            touched
                        }) => (
                            <Form className="flex flex-col sm:gap-1 lg:gap-4">
                                {isRegister &&
                                    <>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="wallet" value="Name of Your First Wallet" />
                                            </div>
                                            <TextInput
                                                value={values.wallet}
                                                id="wallet"
                                                name="wallet"
                                                type="text"
                                                placeholder="checkings"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={errors.wallet ?
                                                    (touched.wallet ?
                                                        <span className="text-red-400 text-sm">{errors.wallet}</span> :
                                                        null)
                                                    : null
                                                }
                                                required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="balance" value="Initial Balance on Your Wallet" />
                                            </div>
                                            <TextInput
                                                value={values.balance}
                                                id="balance"
                                                name="balance"
                                                type="number"
                                                step="0.01"
                                                placeholder="0"
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
                                    </>}
                                <>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="username" value="Your Username" />
                                        </div>
                                        <TextInput
                                            value={values.username}
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="tracker9099"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.username ?
                                                (touched.username ?
                                                    <span className="text-red-400 text-sm">{errors.username}</span> :
                                                    null)
                                                : null
                                            }
                                            required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password" value="Password" />
                                        </div>
                                        <TextInput
                                            value={values.password}
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.password ?
                                                (touched.password ?
                                                    <span className="text-red-400 text-sm">{errors.password}</span> :
                                                    null)
                                                : null
                                            }
                                            required />
                                    </div>
                                </>
                                <Button className="my-2 sm:my-0" type="submit">{isLogin ? "Login" : "Register"}</Button>
                                <Button type="button"
                                    onClick={() => {
                                        setPageType(isLogin ? "register" : "login");
                                        resetForm();
                                    }}>{isLogin
                                        ? "Don't have an Account? Sign Up here."
                                        : "Already have an Account? Login here."}</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>

    )

}

export default LoginForm;