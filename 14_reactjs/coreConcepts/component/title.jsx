import React from 'react'

function GetDiscount(event){
    console.log("5% discount availabe when you purchase greater then 10000 value product");
    console.log(event);
}

function title({pricess, title, feture}) {

  return (
    <>
       <h1>New componenst</h1>
       <h4>Title:{title} </h4>
       <h5>price: {pricess} </h5>
       <h5>Fetures : {feture} </h5>
       {pricess > 1000 ? <p>Discount 5%</p> : <button onClick={GetDiscount} >GetDiscount</button> }


    </>
  )
}
export default title