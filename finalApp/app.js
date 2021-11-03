let express = require("express");
let mongoose = require("mongoose");
let path = require("path");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let flash = require("connect-flash");
let passport = require("passport");
let enforceSSL = require('express-enforces-ssl');
let helmet = require('helmet');
let ms = require('ms');

let setUpPassport = require("./setuppassport.js");
let routes = require("./routes");

let app = express();
mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

app.disable('x-powered-by');

app.use(helmet.xssFilter());
app.use(helmet.frameguard("sameorigin"));
app.use(helmet.noSniff());
app.enable('trust proxy');
app.use(enforceSSL());
app.use(helmet.hsts({
    maxAge: ms('2days'),
    includeSubDomains: true
}));

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname,  "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "TKRvOIJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
});