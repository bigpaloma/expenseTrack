import * as yup from "yup";

export const registerSchema = yup.object().shape({
    username: yup.string().required("Please enter a valid username"),
    password: yup.string().required("Please enter a valid password"),
    wallet: yup.string().required("Please enter a valid wallet name"),
    balance: yup.number().required("Please enter a positive number"),
});
