const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
const promotion=require('./promotions/promorouter');
//app.use("/promotions/:id",promotion);
const leader=require('./leader/leaderRouter');
app.use("/promotions",promotion);
app.use("/leaders",leader);
app.get("/",(req,res)=>{
  res.send("hello");
});
app.listen(3000,()=>{
   console.log("server started");
});