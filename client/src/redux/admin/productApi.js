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

// create a new product
export function createProduct(data) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/product", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
        const result = await responce.json()
        resolve({ result })
        alert("success")
        
    })
}

// delete product
export function deleteProductById(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/product/${id}`, {
            method: "DELETE",
        })
        const result = await responce.json()
        resolve({ result })
    })
}

//update product by id
export function updateProductById(data) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/product/${data.id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data.formattedData)
        })
        const result = await responce.json()
        resolve({ result })
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