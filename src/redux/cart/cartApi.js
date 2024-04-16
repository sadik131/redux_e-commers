export function fetchApi(){
    return new Promise(async(resolve)=>{
        const responce = await fetch("http://localhost:5000")
        const data = await responce.json()
        resolve({data})
    })
}