const express=require("express");
const XRegExp=require("xregexp");
const app=express();
app.use(express.json());

var data=[];
referenceData=[]


app.post("/post",(req,res)=>{

    data.push(req.body);
    referenceData=data[0].referenceData;
    REF_replace(data[0]["payload"]["value"]);
    res.send(data[0]["payload"]);
  
})

function REF_replace(dat) {
    for(i in dat){
      if(dat[i].valueType=='string'){
        for(ref in referenceData){
          if(dat[i].value.match(XRegExp(`${ref}`))){
                 dat[i].value=dat[i].value.replace(XRegExp(`{${ref}}`),referenceData[ref]);
                }
              }
            }
    else{
         REF_replace(dat[i]["value"]);
    }
  }
}


const port=process.env.PORT||8080;
app.listen(port,()=>{console.log(`Running at ${port}`);})

























