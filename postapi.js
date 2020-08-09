const express = require('express');
const app = express();
const routes = require('./routes/route')

app.use(express.json());

app.use(routes);


app.listen(5000,()=>{
    console.log("listening on port 5000")
})

module.exports = app