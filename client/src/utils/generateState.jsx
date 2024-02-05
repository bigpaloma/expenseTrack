export default function generateState(account, type) {
    if (account) {
        if (account[0].transactions) {
            if (account[0].transactions.length !== 0) {
                return account[0].transactions.filter(x => x.type === type);
            }
        }
    }
    else {
        return ""
    }
}