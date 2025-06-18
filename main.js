const productContainer = document.querySelector(".container")
const containerNav = document.getElementById("change-limit")
const spanContent = document.querySelector(".display-limit")
// to get fake API
async function getAllProducts (limit=-1){
    const request = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=30`,{
        headers:{
            "Content-Type":"application/json",
            Authentication: "Bearer token",
        }
    })
    const respond = (await request.json()).products
    displayData((respond));
}
getAllProducts()
// to display products content
function displayData(data) {
    let html = ``
    data.forEach((product=>{
        html += `
    <div class="card">
        <div class="card-img">
            <img src="${product.thumbnail}" alt="${product.category}">
        </div>
        <div class="card-txt">
            <div class="card-txt-cat-rate">
                <span>${product.category}</span>
                <div class="card-rate">
                    ${new Array(5).fill(0).map((ele,index)=>Math.trunc(product.rating) >= index+1?
                        `<svg class="active" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg>`:`<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg>`).join("")}
                </div>
            </div>
            <a href="#"><h2>${product.title}</h2></a>
            <p>${product.description}</p>
            <div class="card-txt-tags">
                ${product.tags.map((tag)=>`<span>${tag}</span>`).join("")}
            </div>
        </div>
    </div>
    `
    }));
    productContainer.innerHTML = html
}
// to change limit
containerNav.addEventListener("change", function() {
    let selectedValue = containerNav.value // to get value of option 
    spanContent.innerHTML = selectedValue
    let newLimit;
    if (selectedValue == "All") {
        newLimit = -1
    }else {
        newLimit = +selectedValue
    }
    getAllProducts(newLimit)
})