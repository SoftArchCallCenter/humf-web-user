const { API_GATEWAY_URL } = require("@/variable");

const QUEUE_URL = `${API_GATEWAY_URL}/queue`

const createOrder = async (order) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${QUEUE_URL}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify(order),
        });
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }

    }catch(error){
        console.log(error)
        return {err:true, result: null};
    }
}

module.exports = {
    createOrder
}