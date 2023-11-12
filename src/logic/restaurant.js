const { API_GATEWAY_URL } = require("@/variable");

const RESTAURANT_URL = `${API_GATEWAY_URL}/restaurant`

const getAllRestaurant = async()=>{
    try{
        const respone = await fetch(`${RESTAURANT_URL}`, {
            method: "GET",
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

const getRestaurantByUserId = async (userId) => {
    try{

        const respone = await fetch(`${RESTAURANT_URL}/user/${userId}`, {
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
    getRestaurantByUserId,
    getAllRestaurant
}