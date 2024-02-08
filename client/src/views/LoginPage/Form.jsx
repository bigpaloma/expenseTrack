import { useState } from "react";
import { config } from "../../Environment"
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { loginSchema } from "./yup/loginSchema";
import { registerSchema } from "./yup/registerSchema";
import { Button, Label, TextInput } from 'flowbite-react';

const LoginForm = () => {
    const URL = config.url;
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
            `${URL}/auth/register`,
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
            `${URL}/auth/login`,
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
            navigate("/dashboard")
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <div className="w-[calc(100vw-2rem)] sm:w-1/2 lg:w-1/3 bg-secondaryLight dark:bg-secondaryDark rounded-2xl shadow-2xl px-4 py-2">
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
                    <Form className="flex flex-col gap-1 lg:gap-4">
                        {isRegister &&
                            <>
                                <div>
                                    <Label htmlFor="wallet" value="Name of Your First Wallet" />
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
                                    <Label htmlFor="balance" value="Initial Balance on Your Wallet" />
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
                                <Label htmlFor="username" value="Your Username" />
                                <TextInput sizing="sm"
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
                                <Label htmlFor="password" value="Password" />
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
                        <div className="flex flex-col items-center">
                            <Button className="w-1/2 my-1 bg-primaryLight dark:bg-primaryDark" type="submit">{isLogin ? "Login" : "Register"}</Button>
                            <Button type="button" className="w-3/4 bg-primaryLight dark:bg-primaryDark"
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                }}>{isLogin
                                    ? "Don't have an Account? Sign Up here."
                                    : "Already have an Account? Login here."}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default LoginForm;