import { API_GATEWAY_URL } from "@/variable";

const NOTIFICATION_URL = `${API_GATEWAY_URL}/notification`

const getNotiByUserId = async (datetime,user_id) => {
    try{
        datetime = new Date(datetime)
        datetime = datetime.toISOString();
        console.log({datetime})
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${NOTIFICATION_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify({datetime,user_id}),
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
    getNotiByUserId
}