let DATA = [];

async function FetchProduct() {
    const obj  = await fetch("product.json");
    const data = await obj.json();
    console.log(data);
    DATA = data;
    displayData(DATA);
}
function sortThem(e){
    if(e == "desc")
 DATA.sort((a,b)=>  b.price - a.price )
else
DATA.sort((a,b)=>  a.price - b.price )

displayData(DATA);
}
function displayData(arr){
    display.innerHTML = "";
    document.getElementById("tbd").innerHTML  = "";
arr.forEach(e => {
    
    document.getElementById("tbd").innerHTML += `<tr><td>${e.name}</td><td>${e.Category}</td><td>${e.price}</td></tr>`
    
});
}

FetchProduct();
const display = document.getElementById("display")
const dropdown = document.getElementById("dropdown");


dropdown.addEventListener("change" ,(e)=>{
    console.log("e : ",e.target.value);
    sortThem(e.target.value);
})





