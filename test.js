const arr = [..."12345678901234567890"]

function handlePageClick(arr,pageNum){
    const itemsPerPage = 5
    const pageCount = Math.ceil(arr.length/itemsPerPage)
    const start = (pageNum-1) * itemsPerPage 
    const end = start + itemsPerPage
    const arr2 = arr.slice(start,end)
    console.log(arr2)
}

handlePageClick(arr, 3)