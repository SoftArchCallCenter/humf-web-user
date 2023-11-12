import { API_GATEWAY_URL } from "@/variable";

const AUTH_URL = `${API_GATEWAY_URL}/auth`
const USER_URL = `${API_GATEWAY_URL}/users`

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
        console.log(respone)
        const result = await respone.json();
        console.log(result)
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
        console.log(respone)
        const result = await respone.json();
        console.log(result)
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
const editUser  = async (UpdateUserDto) => {
    // try{
    //     const respone = await fetch(`${AUTH_URL}/signup`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(signupUserDto),
    //     });
    try{
        const access_token = sessionStorage.getItem("access_token")
        const respone = await fetch(`${USER_URL}/${userId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
                body: JSON.stringify(UpdateUserDto),
            }
        });
        console.log(respone)
        const result = await respone.json();
        console.log(result)
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
    signup,
    login,
    logout,
    getUserById,
    editUser
}