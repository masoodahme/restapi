const express=require("express");
const bodyParser=require("body-parser");
const dishes=express.Router();
dishes.use(bodyParser.json());

dishes.route("/")
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("content-type","plain/text");
    next();
})
.get((req,res,next)=>{
    res.end("will get the details of dishes");
})
.post((req,res,next)=>{
    res.end("will post "+req.body.dish +" to the dishes sections");
})
.put((req,res)=>{
    res.statusCode=403;
    res.end("put operation is denied");
})
.delete((req,res,next)=>{
    res.end("will delete the details of dish");
});

dishes.route("/:id")
.all((req,res,next)=>{
     res.statusCode=200;
     res.setHeader("content-type","plain/text");
     next();
})
.get((req,res,next)=>{
    res.end("will get the details of dish of "+req.params.id);
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end("post operation of "+ req.params.id +"is denied");
})
.put((req,res)=>{
    res.end("dish details of "+ req.params.id +"is updated");
})
.delete((req,res,next)=>{
    res.end("deleting the details of dish of "+ req.params.id );
});
module.exports=dishes;


