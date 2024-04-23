// create user
export function createUser(userInfo) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: { "content-type": "application/json" }
        })
        const data = await responce.json()
        resolve({ data })
    })
}

// check user
export function checkUser(userInfo) {
    return new Promise(async (resolve, reject) => {
        const responce = await fetch(`http://localhost:3000/auth/login`, {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: { "content-type": "application/json" }
        })
        const data = await responce.json()
        resolve({ data })
    })
}
//  user address
export function userAddress(user) {
    return new Promise(async (resolve) => {
        console.log(user)
        const responce = await fetch(`http://localhost:3000/users?id=${user.id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        })
        const data = await responce.json()
        resolve({ data })
    })
}