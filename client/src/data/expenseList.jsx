import { format } from "date-fns";

export const expenseList = [
    {
        id: crypto.randomUUID(),
        label: "rent",
        amount: 1200,
        category: "reacurring expenses",
        date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
    },
    {
        id: crypto.randomUUID(),
        label: "car payment",
        amount: 400,
        category: "investments",
        date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
    },
    {
        id: crypto.randomUUID(),
        label: "food",
        amount: 523.55,
        category: "living expenses",
        date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
    },
];