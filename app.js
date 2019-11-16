var express = require("express");
var app = express();


app.set("view engine", "ejs");
var todoList = [
    "Finish netcentric network layer note",
    "Prepare for the interview"
]

//Express routes here 
app.get("/", function(req, res) {
    res.render("index.ejs", {todoList: todoList});
});


//catch all routes 
app.get("*", function(req, res){
    res.send("<h1>Invalid page</h1>")
});


//server listening on port 3000

app.listen(3000, function(){
    console.log("server started on port 3000");
});