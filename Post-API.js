const express=require("express");
const XRegExp=require("xregexp");
const app=express();
app.use(express.json());

var data={};

app.post("/post",(req,res)=>{

    data=req.body;
    REF_replace(data.payload.value);
    res.send(data.payload);


})
    function REF_replace(dat) {
      
          for(i in dat){
            if(dat[i].valueType=='string'){
              for(ref in data.referenceData){
                if(dat[i].value.match(XRegExp(`${ref}`))){
                       dat[i].value=dat[i].value.replace(XRegExp(`{${ref}}`),data.referenceData[ref]);
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
module.exports=app;
