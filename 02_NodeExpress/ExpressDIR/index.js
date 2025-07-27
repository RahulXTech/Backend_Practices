const express =  require("express");
const app = express();
let heading = "<h1>Wel-come to Express";
// console.log(app);
let port = 4000;
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})


app.use((req, rec)=>{
    // console.log(req);
    rec.send(heading);
    rec.send({
        name : "orange",
        color : "yellow"
    });
    console.log("requist received");

});
