var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var app = express();
var router = express.Router();

var axios = require("axios");
var cheerio = require("cheerio");

require("./config/routes")(router);


app.use(express.static(__dirname +  "/public"));

app.engine("handlebars", expressHandlebars ({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

// mongoose.connect("mongodb:// localhost/mongoHeadlines");
// var db= mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//     console.log("Connected to Mongoose!");
// } );
var db = mongoose.connect("mongodb://localhost:27017/mongoHeadlines")

// var db = process.env.MONGODB_URI || ("mongodb://localhost:27017/mongoHeadlines", { useNewUrlParser: false } );
// mongoose.connect(db, function(error) {
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log("mongoose connection is successful");

//     }
// })

app.listen(PORT, function() {
    console.log("Listening to Port:" + PORT);
}); 

