let path = require("path");
let express= require("express");
let zipdb = require("zippity-do-dah");
let weather = require("weather-js");

let app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next){
    let zipcode = req.params[0];
    let loc = zipdb.zipcode(zipcode);

    if (!loc.zipcode){
        next();
        return;
    }

    weather.find({search: loc.zipcode, degreeType: 'F'}, function(err, data){
        if (err){
            next();
            return;
        }

        res.json({
            zipcode: loc.zipcode,
            temperature: `${data[0].current.temperature}`,
            city: loc.city,
            state: loc.state
        });
        console.log(loc)
    });
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(3000);