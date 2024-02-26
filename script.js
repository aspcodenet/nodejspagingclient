const tbody = document.getElementById("tbody")

const allSortLinks = document.getElementsByClassName('bi') 

let  currentSortCol = ""
let currentSortOrder = "" 

Object.values(allSortLinks).forEach(link=>{
    link.addEventListener("click",()=>{
        currentSortCol = link.dataset.sortcol
        currentSortOrder = link.dataset.sortorder
        refresh()
    })
    
})

function createTd(data){
    let element =  document.createElement("td")
    element.innerText = data
    return element
}

async function refresh(){
    //fetch!
    let url = "http://localhost:3000/products?sortBy=" + currentSortCol + "&sortOrder=" + currentSortOrder 

    const response = await fetch(url,{
        headers:{
            'Accept': 'application/json'
        }
    })
    const products = await response.json()
    tbody.innerHTML = ""
    products.forEach(prod=>{
        const tr = document.createElement("tr")
        tr.appendChild(createTd(prod.id))
        tr.appendChild(createTd(prod.name))
        tr.appendChild(createTd(prod.unitPrice))
        tr.appendChild(createTd(prod.stockLevel))
        tbody.appendChild(tr)
    })





    // json
    //skapa ny trs tbody
}

await refresh()
