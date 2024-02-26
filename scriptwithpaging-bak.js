const filterInput = document.getElementById("filterInput")
const tbody = document.getElementById("tbody")
const sortIdDown = document.getElementById("sortIdDown")
const sortIdUp = document.getElementById("sortIdUp")
const allSortLinks = document.getElementsByClassName('bi') 
const pager = document.getElementById('pager') 

let currentSortCol = "id"
let currentSortOrder = "asc"
let currentSearchText = ""
let currentPageNo = 1
let currentPageSize = 20

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



function createPager(count,pageNo,currentPageSize){
    pager.innerHTML = ""
    let totalPages = Math.ceil(count / currentPageSize)
    for(let i = 1; i <= totalPages; i++){
        const li = document.createElement('li')
        li.classList.add("page-item")
        if(i == pageNo){
            li.classList.add("active")
        }
        const a = document.createElement('a')
        a.href="#"
        a.innerText = i
        a.classList.add("page-link")
        li.appendChild(a)
        a.addEventListener("click",()=>{
            
            currentPageNo = i
            refresh()
        })
        pager.appendChild(li)
    }
}


function createTd(data){
    let element =  document.createElement("td")
    element.innerText = data
    return element
}




async function refresh(){
    let offset = (currentPageNo - 1) * currentPageSize
    let url = "http://localhost:3000/productswithpaging?sortBy=" + currentSortCol + "&sortOrder=" 
            + currentSortOrder + "&q=" +currentSearchText + "&offset=" + offset + "&limit=" + currentPageSize 

    const response = await fetch(url,{
        headers:{
            'Accept': 'application/json'
        }
    })

    const result = await response.json()
    const count = result.count
    const products = result.rows
    tbody.innerHTML = ""
    products.forEach(prod=>{
        const tr = document.createElement("tr")
        tr.appendChild(createTd(prod.id))
        tr.appendChild(createTd(prod.name))
        tr.appendChild(createTd(prod.unitPrice))
        tr.appendChild(createTd(prod.stockLevel))
        tbody.appendChild(tr)
    })
    createPager(count,currentPageNo,currentPageSize)
}


await refresh()
