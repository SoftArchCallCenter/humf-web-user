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

module.exports = {
    getUserId
}