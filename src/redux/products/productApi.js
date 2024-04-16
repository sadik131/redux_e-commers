// fetch all products
export function fetchApi() {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/products")
        const data = await responce.json()
        resolve({ data })
    })
}

// fetch Product by id
export function fetchProductsById(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/products/${id}`)
        const data = await responce.json()
        resolve({ data })
    })
}
//  fetch all catagory
export function fetchCatagorysByApi() {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/catagory")
        const data = await responce.json()
        resolve({ data })
    })
}
export function fetchBrandsByApi() {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/brands")
        const data = await responce.json()
        resolve({ data })
    })
}

export function fetchApiByFilter(filter, pagination) {
    let quarry = ""
    for (let key in filter) {
        quarry += `${key}=${filter[key]}&`
    }
    for (let key in pagination) {
        quarry += `${key}=${pagination[key]}&`
    }
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/products?" + quarry)
        console.log(responce)
        const data = await responce.json()
        resolve({ data })
    })
}