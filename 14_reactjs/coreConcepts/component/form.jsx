import React from 'react'
function submitForm(event){
    console.log("01. Form has submited");
    event.preventDefault();
    console.log(event);
}

function Form() {
  return (
    <>
        <h1>Form Submiting</h1>
        <form onSubmit={submitForm}>
            <input type="text" /><button>Submit</button>
        </form>
    </>
  )
}
export default Form