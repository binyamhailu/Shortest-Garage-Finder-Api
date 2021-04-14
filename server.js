
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./databases/db');
var app=express();
app.use(bodyParser.json());

app.use(cors());

require("./routes/serverRoute")(app);
app.listen(3000, ()=>{
    console.log('started on port 3000');
});
