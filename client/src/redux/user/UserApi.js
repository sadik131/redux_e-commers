export function fetchUser(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/user/${id}`)
        const data = await responce.json()
        resolve({ data })
    })
}

export function updateUser(info) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/user`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(info)
        })
        const data = await responce.json()
        resolve({ data })
    })
}

// fetch user order 
export function orderbyUserId(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/order/${id}`)
        const data = await responce.json()
        resolve({ data })
    })
}
// delete user address 
export function deleteUserAddress({ user, addressId }) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/user/address/${user}/${addressId}`, {
            method: "DELETE"
        })
        const data = await responce.json()
        resolve({ data })
    })
}

// update user address

export function updateUseraddrss({ user, updatedAddress, editAddress }) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/user/updateAddress", {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ user, updatedAddress, editAddress })
        })
        const data = await responce.json()
        resolve({ data })
    })
}