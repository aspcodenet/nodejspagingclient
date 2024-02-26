const filterInput = document.getElementById("filterInput")
const tbody = document.getElementById("tbody")
const sortIdDown = document.getElementById("sortIdDown")
const sortIdUp = document.getElementById("sortIdUp")
const allSortLinks = document.getElementsByClassName('bi') 

let currentSortCol = "id"
let currentSortOrder = "asc"
let currentSearchText = ""

Object.values(allSortLinks).forEach(link=>{
    link.addEventListener("click",()=>{
        currentSortCol = link.dataset.sortcol
        currentSortOrder = link.dataset.sortorder
        refresh()
    })
    
})

function debounce(cb, delay = 250) {
    let timeout
  
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
  }

  const updateQuery = debounce(query => {
    currentSearchText = query
    refresh()
  }, 1000)



filterInput.addEventListener("input",(e)=>{
    updateQuery(e.target.value)
})



function createTd(data){
    let element =  document.createElement("td")
    element.innerText = data
    return element
}




async function refresh(){
    let url = "http://localhost:3000/products?sortBy=" + currentSortCol + "&sortOrder=" + currentSortOrder + "&q=" +currentSearchText

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
}


await refresh()
