import React from "react";
import Title1 from "../component/title";
import Form from "../component/form"
export default function App(){
      let options = ["fast", "reliable", "reusable", "simple"]
  return(
    <>

      <h1>Title of components</h1>
      <Title1 title="Phone" pricess={10000} feture={options}/>
      <Title1 title="Iphone" pricess={200} feture={options} />
      <Form/>

    </>
  )

}
