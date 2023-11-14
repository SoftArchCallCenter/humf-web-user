import { API_GATEWAY_URL } from "@/variable";

const MENU_URL = `${API_GATEWAY_URL}/menu`

const getAllMenuByRestaurant = async (resId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${MENU_URL}/res/${resId}`, {
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
    getAllMenuByRestaurant
}