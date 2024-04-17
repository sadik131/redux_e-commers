// create user
export function createUser(userInfo) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/users", {
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
        const responce = await fetch(`http://localhost:3000/users?email=${userInfo.email}`)
        const data = await responce.json()
        if (data.length) {
            if(userInfo.password === data[0].password){
                resolve({data:data[0]})
            }
            else{
                reject({message:"Wrong credentials"})
            }
        } else {
            reject({ message: "Wrong credentials" })
        }
    })
}