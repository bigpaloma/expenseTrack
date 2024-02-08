import { config } from "../Environment"

export default async function getUserData(id, token) {

    const URL = config.url;

    const response = await fetch(`${URL}/user/${id}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
    const data = await response.json();
    return data;
};