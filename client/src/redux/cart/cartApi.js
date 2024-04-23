// fetch cat item
export function GetcartItem(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/cart/${id}`)
        const data = await responce.json()
        resolve({data})
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