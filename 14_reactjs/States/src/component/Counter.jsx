import React, { useState } from 'react'

const [val, seVal] = useState(44);
function IncreaseVal(){
    seVal+=1;
}

function Counter() {
    return (
    <>
        <h1>Counter : {seVal}</h1>
        <button onClick={IncreaseVal} >Increase</button>
    </>
  )
}

export default Counter