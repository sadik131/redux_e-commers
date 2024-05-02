export function createOrder(order) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/order", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(order)
        })
        const data = await responce.json()
        resolve({ data })
    })
}

export function resetCart(id) {
    return new Promise(async (resolve) => {
        const userdata = await fetch(`http://localhost:3000/cart/${id}`)
        const { result } = await userdata.json()
        for (const res of result) {
            const rest = await fetch(`http://localhost:3000/cart/${res._id}`, {
                method: "DELETE"
            })
        }
        resolve({ success: true })
    })
}

export function fetchAllOrder() {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/order`)
        const data = await responce.json()
        resolve({ data })
    })
}

// update order status

export function updateStatus(update) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/order`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(update)
        })
        const data = await responce.json()
        resolve({ data })
    })
}
