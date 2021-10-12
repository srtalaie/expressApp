let express = require("express");
let passport = require("passport");

let User = require("./models/user");

let router = express.Router();

router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", (req, res, next) => {
    User.find()
        .sort({ createdAt: "descending" })
        .exec((err, users) => {
            if (err) { return next(err); }
            res.render("index", { users: users });
        });
});

//Sign-up page
router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username: username }, (err, user) => {
        if (err) { return next(err) }
        if (user) {
            req.flash("error", "Username or User already exists");
            return res.redirect("/signup");
        }

        let newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    });
}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));

//Profiles route
router.get("/users/:username", (req, res, next) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err) { return next(err) }
        if(!user) { return next(404) }
        res.render("profile", { user: user });
    });
});

module.exports = router;