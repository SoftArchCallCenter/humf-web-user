import { API_GATEWAY_URL } from "@/variable";

const AUTH_URL = `${API_GATEWAY_URL}/auth`
const USER_URL = `${API_GATEWAY_URL}/users`

const getUserId = (router) => {
    const user = sessionStorage.getItem('user')
    if (user){
        return JSON.parse(user).userId
    } else {
        alert("please sign in")
        router.push("/")
        return
    }
}

const getUserById = async (userId) => {
    try{
        const respone = await fetch(`${USER_URL}/${userId}`, {
            method: "GET",
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
    getUserId,
    getUserById
}