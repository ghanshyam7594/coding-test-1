const express = require('express');
const router = express.Router();

router.post("/",(req,res,next)=>{
    req.file = req.body;
    next();
},(req,res,next)=>{
    var file = req.file;
    var stringfile = JSON.stringify(file.payload)
    Object.keys(file.referenceData).forEach(key => {
        var toReplace =`{${key}}`;
        var regex = new RegExp(toReplace, "g");
        stringfile = stringfile.replace(regex,file.referenceData[key])
    });
    var output= JSON.parse(stringfile);
    res.status(200).json(output);
    next();
})

module.exports = router