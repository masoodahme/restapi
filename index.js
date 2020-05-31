const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
const cookieParser=require("cookie-parser");
const session=require("express-session");
const FileStore=require("session-file-store")(session);
app.use(express.static("public"));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/users",{useNewUrlParser:true,useCreateIndex:true})
.then(()=>{
  console.log("Databse connection success");
})
.catch(()=>{
  console.log("error");
})
app.use(bodyParser.urlencoded({
    extended:true
}));
const dish=require("./dish/dishRouter");
const promotion=require('./promotions/promorouter');
const leader=require('./leader/leaderRouter');
const userRouter=require("./routes/user");
app.use(bodyParser.json());

//app.use(cookieParser("123-456-789"));
app.use(session({
  name:"session-id",
  secret:"123-456-789",
  saveUninitialized:false,
  resave:false,
  store:new FileStore()
}));
app.use("/",userRouter);
app.use("/users",userRouter);
function auth (req, res, next) {
  console.log(req.session);

if(!req.session.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
}
else {
  if (req.session.user === 'authenticated') {
    next();
  }
  else {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  }
}
}

app.use(auth);
app.use("/promotions",promotion);
app.use("/leaders",leader);
app.use("/dishes",dish)
app.get("/",(req,res)=>{
  res.send("hello");
});
app.listen(3000,()=>{
   console.log("server started");
});