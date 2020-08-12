const express = require('express');
const app = express();
const fs = require('fs');

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


    app.use(function (req,res,next) {
      var f = fs.readFileSync('input.json');      
      file = JSON.parse(f);
      console.log(typeof f);
      req.out = convert(file.payload,file.referenceData);
    next();
  });

  app.get('/',(req,res)=>{
   res.json(req.out)
   console.log(typeof req.out)
  })
  app.listen(5000,()=>{
    console.log("listening on port 5000")
})