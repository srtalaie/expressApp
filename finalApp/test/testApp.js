let express = require('express');
let path = require('path');

let app = express();

app.set('port', process.env.PORT || 3000);

let viewsPath = path.join(__dirname, "views");
app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    let userAgent = req.headers['user-agent'] || "none";
    if (req.accepts('html')) {
        res.render('index', { userAgent: userAgent });
    } else {
        res.type("text");
        res.send(userAgent);
    }
});

app.listen(app.get("port"), () => {
    console.log('App started on port ', app.get("port"));
});

module.exports = app;