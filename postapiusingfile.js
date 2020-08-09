const express = require('express');
const app = express();
const fs = require('fs');

var file = function (req, res, next) {
    var data = fs.readFileSync("input.json")
    var file = JSON.parse(data);
    var stringfile= JSON.stringify(file.payload)
    Object.keys(file.referenceData).forEach(key => {
        var toReplace =`{${key}}`;
        var regex = new RegExp(toReplace, "g");
        stringfile = stringfile.replace(regex,file.referenceData[key])
    });
    req.response= JSON.parse(stringfile);
    next()
  }
  
  app.use(file);

  app.get("/",(req,res)=>{
    
    res.json(req.response);
});

app.listen(3000,()=>{
    console.log("listening on port 3000")
})