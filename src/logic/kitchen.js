import { API_GATEWAY_URL } from "@/variable";

const KITCHEN_URL = `${API_GATEWAY_URL}/kitchen`

const getTicketsByUserId = async (userId) => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${KITCHEN_URL}/user/${userId}`, {
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

const completeTicket = async (ticketId) => {
  try{
      const access_token = sessionStorage.getItem("access_token")
      const respone = await fetch(`${KITCHEN_URL}/${ticketId}`, {
          method: "POST",
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

const getAllKitchenTotalTickets = async () => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${KITCHEN_URL}/ticket`, {
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
  getTicketsByUserId,
  completeTicket,
  getAllKitchenTotalTickets
}