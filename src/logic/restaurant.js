const { API_GATEWAY_URL } = require("@/variable");

const RESTAURANT_URL = `${API_GATEWAY_URL}/restaurants`

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

const addRestaurant = async (createRestaurantDto) => {
    try{
        const respone = await fetch(`${RESTAURANT_URL}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createRestaurantDto),
        })
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }
    } catch (error){
        console.log(error)
        return {err:true, result: null}
    }
}

const deleteRestaurant = async (resId) => {
    try{
        const respone = await fetch(`${RESTAURANT_URL}/${resId}`,{
            method: "DELETE",
        })
        const result = await respone.json();
        if (!respone.ok) {
            return {err:true, result: null};
        } else {
            return {err:false, result};
        }
    } catch (error){
        console.log(error)
        return {err:true, result: null}
    }
}

module.exports = {
    getRestaurantByUserId,
    addRestaurant,
    deleteRestaurant
}