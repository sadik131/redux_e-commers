// fetch cat item
export function GetcartItem() {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/cart/own`)
        const data = await responce.json()
        resolve({ data })
    })
}

// add item to the cart
export function addCartItem(item) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/cart", {
            method: "POST",
            body: JSON.stringify(item),
            headers: { "content-type": "application/json" }
        })
        const data = await responce.json()
        resolve({ data })
    })
}

// add item to the cart
export function updateCart(update) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/cart", {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { "content-type": "application/json" }
        })
        const data = await responce.json()
        resolve({ data })
    })
}

// remove for the cart
export function removeItem(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/cart/${id}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })
        const data = await responce.json()
        resolve({ data })
    })
}
