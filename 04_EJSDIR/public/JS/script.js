const btn = document.querySelectorAll("button");

for(let butt of btn){
    butt.addEventListener("click",()=>{
        console.log("button is working");
    })
}