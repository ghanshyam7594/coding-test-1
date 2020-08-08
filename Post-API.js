const express=require("express");
const XRegExp=require("xregexp");
const app=express();
app.use(express.json());

referenceData=[]

app.post("/post",(req,res)=>{

    var reqBody=req.body;
    referenceData=reqBody.referenceData;
    var transform= JSON.stringify(reqBody.payload)
    for(ref in referenceData){
        transform=transform.replace(XRegExp(`{${ref}}`),referenceData[ref]);
    }
    res.status(200).send(JSON.parse(transform));
    
})


const port=process.env.PORT||8080;
app.listen(port,()=>{console.log(`Running at ${port}`);})
module.exports=app;

























