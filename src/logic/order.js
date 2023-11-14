import { API_GATEWAY_URL } from "@/variable";

const ORDER_URL = `${API_GATEWAY_URL}/order`

const findOrderByUser = async (userId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${ORDER_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        });
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }
    } catch (error) {
        console.log(error)
        return {err:true, result: null};
    }
}

module.exports = {
    findOrderByUser
}