export default async function getUserData(id, token) {
    const response = await fetch(`https://expense-tracker-api-obou.onrender.com/user/${id}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
    const data = await response.json();
    return data;
};