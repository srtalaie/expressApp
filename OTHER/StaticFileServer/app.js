let express = require("express");
let morgan = require("morgan");
let path = require("path");
let fs = require("fs");

let app = express();

//Logger
app.use(morgan("short"));

//File handler
let filePath = path.join(__dirname, "static");
app.use(express.static(filePath));

//404 handler
app.use(function(req, res){
    res.status(404);
    res.send("File not found.");
});

app.listen(3000, function(){
    console.log("App started on port 3000")
});