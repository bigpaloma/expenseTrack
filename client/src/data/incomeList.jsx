import { format } from "date-fns";

export const incomeList = [
    {
        id: crypto.randomUUID(),
        label: "wage",
        amount: 2000,
        category: "monthly income",
        date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
    },
    {
        id: crypto.randomUUID(),
        label: "sneaker sales",
        amount: 800,
        category: "side hustle",
        date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
    },
    {
        id: crypto.randomUUID(),
        label: "crypto",
        amount: 34534.45,
        category: "dividents",
        date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
    }
];