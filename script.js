const tbody = document.getElementById("tbody")
const filterInput = document.getElementById("filterInput")
const allSortLinks = document.getElementsByClassName('bi') 
const pager = document.getElementById('pager') 

let  currentSortCol = ""
let currentSortOrder = "" 
let currentQ = ""
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
    currentQ = query
    refresh()
  }, 1000)



filterInput.addEventListener("input",(e)=>{
    updateQuery(e.target.value)
})

// VARIANT 2
// filterInput.addEventListener("input",(e)=>{
//      currentQ = e.target.value
//      refresh()
// })


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
    //let offset = (currentPageNo - 1) * currentPageSize

    //fetch!
    // let url = "http://localhost:3000/products?sortCol=" 
    //     + currentSortCol + "&sortOrder=" + currentSortOrder +
    //      "&q=" + currentQ + "&limit=" + currentPageSize+  "&offset=" + offset

    let url = "http://localhost:3000/products?sortCol=" 
        + currentSortCol + "&sortOrder=" + currentSortOrder + "&limit=200"
         + "&offset=0" 
    console.log(url)


    const response = await fetch(url,{
        headers:{
            'Accept': 'application/json'
        }
    })
    // //Paging behöver vi 20 posterna för aktuell sida
    // // Totala antalet poster - count
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
    // createPager(products.total,currentPageNo,currentPageSize)





    // json
    //skapa ny trs tbody
}

await refresh()
