import { getAllKitchenTotalTickets } from "@/logic/kitchen";
const { API_GATEWAY_URL } = require("@/variable");

const RESTAURANT_URL = `${API_GATEWAY_URL}/restaurant`

const getAllRestaurant = async()=>{
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${RESTAURANT_URL}`, {
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

    }catch(error){
        console.log(error)
        return {err:true, result: null};
    }
}

const getRestaurantByUserId = async (userId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${RESTAURANT_URL}/user/${userId}`, {
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

const getRestaurantDetails = async () => {
    try{
        const restaurantList = await getAllRestaurant();
        if (restaurantList.err){
            throw new Error("This is a restaurantList error.");
        }
        const totalTicketList = await getAllKitchenTotalTickets();
        if (totalTicketList.err){
            throw new Error("This is a totalTicketList error.");
        }
        const result1 = restaurantList.result.Restaurant
        const map = new Map();
        if(totalTicketList.result.totals){
            totalTicketList.result.totals.forEach(item => {
                map.set(item.resId,item.total)
            })
        }
        return {err:false, result:{
            restaurantList: result1,
            totalTicketList: map
        }}
    } catch (err) {
        console.log(err)
        return {err:true, result: null};
    }
    
}

const getFilterRestaurant = (allRestaurantList, formData) => {
    // console.log(allRestaurantList)
    console.log(formData)
    const result = allRestaurantList.filter((res) => {
        const regex = new RegExp(formData.name);
        return regex.test(res.name)
    }).filter((res) => {
        const openTime = res.openTime;
        const closeTime = res.closeTime;
        const compareTime = formData.time;
        if (compareTime === "") return true;
        const compareDate = new Date(0, 0, 0, ...compareTime.split(':').map(Number));
        const openDate = new Date(0, 0, 0, ...openTime.split(':').map(Number));
        const closeDate = new Date(0, 0, 0, ...closeTime.split(':').map(Number)); 
        // console.log(openTime,closeTime,compareTime)
        return compareDate >= openDate && compareDate <= closeDate;
    })
    console.log(result)
    return result
}

module.exports = {
    getRestaurantByUserId,
    getAllRestaurant,
    getRestaurantDetails,
    getFilterRestaurant
}