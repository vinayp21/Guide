let currentTheme="dark";
let tableSize=20
let currentRow=20;
let tableData=[];
let filteredData=[];
window.onload=function(){
    const file= document.getElementById('file-upload');
    file.addEventListener("change", uploadFile);
    
    const icon = document.querySelector("i");
    icon.style.visibility="hidden";
    const search = document.querySelector(".search-input");
    search.value=""
    search.addEventListener("input", searchData);
}

function searchData(e){
    const searchValue=e.target.value
     filteredData= tableData.filter(row =>{
        return row.includes(searchValue);
    })
    const tableBody= document.querySelector("tbody");
    tableBody.innerHTML="";
    console.log(filteredData)
    loadMoreData(0,filteredData)


}
function uploadFile(e){
    const table= document.querySelector(".table");
    table.innerHTML="";
    if(!this.files[0].name.includes(".csv")){
        table.style.height="0"
        const invalidEle = document.querySelector(".invalid");
        invalidEle.classList.remove("hide");
        return
    }

    var read=new FileReader()
    read.onload=function(){
        renderTable(read.result)
    }
    read.readAsText(this.files[0]);
}

function changeTheme(){
    const bodyElement = document.body;
    if(currentTheme==="dark"){
        currentTheme="light"
        bodyElement.classList.remove("dark");
    }else{
        currentTheme="dark";
        bodyElement.classList.remove("light")
    }
    
    bodyElement.classList.add(currentTheme)
}

function renderTable(result){
    if(!result.length){
        const noDataEle = document.querySelector(".no-data");
        noDataEle.classList.remove("hide");
    }
    const rows = result.split("\n");
    tableData=rows;
    const columns= rows[0].split(",");
    const tableELement = document.querySelector(".table");
    tableELement.style.height="400px"
    const columnrow= document.createElement("tr");
    for(let i=0; i<columns.length;i++){
        const col = document.createElement('th');
        col.textContent=columns[i];
        columnrow.appendChild(col);
    }
    tableELement.appendChild(columnrow)
    const tableBody= document.createElement("tbody");
    tableELement.addEventListener('scroll', onTableScroll)
    for(let i=1; i<tableSize+1;i++){
        const rowData= document.createElement("tr");
        const colData = rows[i].split(",");
        for(let j=0; j<colData.length;j++){
            const col = document.createElement('td');
            col.textContent=colData[j];
            rowData.appendChild(col);
        }
        tableBody.appendChild(rowData)
        tableELement.appendChild(tableBody)
    }

}

function onTableScroll(e){
    const height =this.clientHeight;
    const scrollTop=this.scrollTop;
    const scrollHeight=this.scrollHeight
    if (height + scrollTop >= scrollHeight - 5) {
        const icon = document.querySelector("i");
        icon.style.visibility="visible";
        setTimeout(() =>{
            loadMoreData(currentRow);
        },2000)
      }
}

function loadMoreData(row, loadData){
    let data=tableData;
    if(loadData){
        data=loadData;
    }
    const icon = document.querySelector("i");
    icon.style.visibility="hidden";
    const startIndex= row? row+1:0;
    currentRow+=tableSize;
    if(startIndex>data.length){
        return;
    }
    const tableBody= document.querySelector("tbody");
    const len= Math.min(startIndex+tableSize+1, data.length)

    for(let i=startIndex; i<len;i++){
        const rowData= document.createElement("tr");
        const colData = data[i].split(",");
        for(let j=0; j<colData.length;j++){
            const col = document.createElement('td');
            col.textContent=colData[j];
            rowData.appendChild(col);
        }
        tableBody.appendChild(rowData)
    }


}