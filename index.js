const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const cookieParser=require("cookie-parser");
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.use(cookieParser("123-456-789"));
function auth(req,res,next){
  console.log(req.signedCookies);
  if(!req.signedCookies.user)
  {
    const authHeaders=req.headers.authorization;
    
     if(!authHeaders)
     {
      var err=new Error("You are not authenticate");
      res.setHeader("www-Authenticate","Basic");
      err.status=401;
      return next(err);//go to error middleware
    }
    const auth=Buffer.from(authHeaders.split(" ")[1],"base64").toString().split(":");
    var user=auth[0];
    var password=auth[1];
    if(user=="admin" && password==="password"){
      res.cookie("user","admin",{signed:true});
      next();//got to next middleware
    }
    else{
      var err=new Error("You are not authenticate");
      res.setHeader("www-Authenticate","Basic");
      err.status=401;
     return next(err);//go to error middleware
     
    }

  }
  else{
    if(req.signedCookies.user==="admin")
    {
        next();//authorized
    }
    else{
      var err=new Error("You are not authenticate");
      err.status=401;
     return next(err);//go to error middleware
    }
  }
  
  

}

app.use(auth);
const dish=require("./dish/dishRouter");
const promotion=require('./promotions/promorouter');
const leader=require('./leader/leaderRouter');
app.use("/promotions",promotion);
app.use("/leaders",leader);
app.use("/dishes",dish)
app.get("/",(req,res)=>{
  res.send("hello");
});
app.listen(3000,()=>{
   console.log("server started");
});