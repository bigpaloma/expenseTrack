import * as yup from "yup"

const transactionSchema = yup.object().shape({
    label: yup.string().required("This field is required."),
    category: yup.string(),
    //newCategory: yup.string().when("category", {
    //    is: (val) => val === "",
    //    then: () => yup.string().required("This field is required."),
    //    otherwise: () => yup.string(),
    //}),
    amount: yup.number().positive().required("This field is required."),
    date: yup.date().default(() => new Date()),
    wallet: yup.string()
});

export default transactionSchema