import { format } from "date-fns"

export const accountsList = [
    {
        id: crypto.randomUUID(),
        name: "Furkan",
        wallets: [
            {
                id: crypto.randomUUID(),
                name: "checkings",
                balance: 12500
            }
        ],
        transactions: [
            {
                id: crypto.randomUUID(),
                label: "mansion rent",
                amount: 1200,
                category: "reacurring expenses",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "expense",
                label: "car business",
                amount: 400,
                category: "investments",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "expense",
                label: "bags",
                amount: 523.55,
                category: "living expenses",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "income",
                label: "millionaies",
                amount: 2005120,
                category: "monthly income",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "income",
                label: "sneaker sales",
                amount: 800,
                category: "side hustle",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "income",
                label: "aktien",
                amount: 34534.45,
                category: "dividents",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            }
        ]
    },
    {
        id: crypto.randomUUID(),
        name: "Ali",
        wallets: [
            {
                id: crypto.randomUUID(),
                name: "checkings",
                balance: 15520
            }
        ],
        transactions: [
            {
                id: crypto.randomUUID(),
                type: "expense",
                label: "rent",
                amount: 1200,
                category: "reacurring expenses",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "expense",
                label: "car payment",
                amount: 400,
                category: "investments",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "expense",
                label: "food",
                amount: 523.55,
                category: "living expenses",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "income",
                label: "wage",
                amount: 2000,
                category: "monthly income",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "income",
                label: "sneaker sales",
                amount: 800,
                category: "side hustle",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            },
            {
                id: crypto.randomUUID(),
                type: "income",
                label: "crypto",
                amount: 34534.45,
                category: "dividents",
                date: format(new Date(2001, 1, 1), "MM/dd/yyyy")
            }
        ]
    },
    {
        id: crypto.randomUUID(),
        name: "fufu",
        wallets: [
            {
                id: crypto.randomUUID(),
                name: "checkings",
                balance: 500
            }
        ],
        transactions: []
    }
]