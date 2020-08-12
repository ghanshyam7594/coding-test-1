const express = require('express');
const app = express();
const routes = require('./routes/route')

var convert= function(obj,data){
    if(Array.isArray(obj.value)){
       obj.value.forEach((element)=>{
           if(Array.isArray(element.value)){
               convert(element,data)
           }
         Object.keys(data).forEach((label)=>{
           if(element.value.includes(`{${label}}`)){
           element.value = element.value.replace(`{${label}}`,data[label]);
            }
         })

       })
       return obj;
   }
   else{
       Object.keys(data).forEach((label)=>{
           if(obj.value.includes(`{${label}}`)){
           obj.value = obj.value.replace(`{${label}}`,data[label]);
            }
         })
         return obj;
   }
}

app.use(express.json({limit: '50mb'}));

app.use(function (req,res,next) {
    req.out = convert(req.body.payload,req.body.referenceData)
    next();
 });

app.use(routes);


app.listen(5000,()=>{
    console.log("listening on port 5000")
})

module.exports = app