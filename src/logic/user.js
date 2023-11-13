import { API_GATEWAY_URL } from "@/variable";

const AUTH_URL = `${API_GATEWAY_URL}/auth`
const USER_URL = `${API_GATEWAY_URL}/user`

const getUserId = (router) => {
    const access_token = sessionStorage.getItem("access_token")
    if (access_token){
        const result = JSON.parse(Buffer.from(access_token.split('.')[1], 'base64').toString());
        if (result.sub){
            return result.sub
        } else {
            alert("please sign in")
            router.push("/")
            return 
        }
    } else {
        alert("please sign in")
        router.push("/")
        return
    }
}

const signup = async (signupUserDto) => {
    try{
        const respone = await fetch(`${AUTH_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupUserDto),
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

const login = async (loginUserDto) => {
    try{
        const respone = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUserDto),
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

const logout = async () => {
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${AUTH_URL}/logout`, {
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

const getUserById = async (userId) => {
    
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${USER_URL}/${userId}`, {
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
//Help
const editUser  = async (userId, UpdateUserDto) => {
    try{
        // console.log(userId);
        // 
        // Use Object.entries to get an array of [key, value] pairs
        const entries = Object.entries(UpdateUserDto);
        const filteredEntries = entries.filter(([key, value]) => value !== '');
        UpdateUserDto = Object.fromEntries(filteredEntries);
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${USER_URL}/${userId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
            }, body: JSON.stringify(UpdateUserDto),
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

const uploadImage = async(userId, UpdateUserDto) => {
    // try{
    //     // Implement later, wait for apigateway
    //     const entries = Object.entries(UpdateUserDto);
    //     const filteredEntries = entries.filter(([key, value]) => value !== '');
    //     UpdateUserDto = Object.fromEntries(filteredEntries);
    //     const access_token = sessionStorage.getItem("access_token")
    //     const respone = await fetch(`${USER_URL}/${userId}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Authorization": `Bearer ${access_token}`,
    //             "Content-Type": "application/json",
    //         }, body: JSON.stringify(UpdateUserDto),
    //     });
    //     const result = await respone.json();
    //     if (!respone.ok) {
    //         return {err:true, result: null};
    //     } else {
    //         return {err:false, result};
    //     }

    // } catch (error) {
    //     console.log(error)
    //     return {err:true, result: null};
    // }
    
}

module.exports = {
    getUserId,
    signup,
    login,
    logout,
    getUserById,
    editUser,
    uploadImage
}