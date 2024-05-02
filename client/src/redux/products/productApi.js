// fetch all products
export function fetchApi() {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/product")
        const data = await responce.json()
        resolve({ data })
    })
}

// fetch Product by id
export function fetchProductsById(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/product/${id}`)
        const data = await responce.json()
        resolve({ data })
    })
}
//  fetch all catagory
export function fetchCatagorysByApi() {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/categorys")
        const data = await responce.json()
        resolve({ data })
    })
}
export function fetchBrandsByApi() {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/brand")
        const data = await responce.json()
        resolve({ data })
    })
}

export function fetchApiByFilter(filter, pagination) {
    let query = "";
    for (let key in filter) {
        query += `${key}=${filter[key]}&`;
    }
    for (let key in pagination) {
        query += `${key}=${pagination[key]}&`;
    }
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/product?" + query);
        const data = await response.json();
        resolve({ data });
    });
}