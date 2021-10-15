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

function ensureAuthenticated (req, res, next){
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
}

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

//Login
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

//Log out
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//Edit
router.get("/edit", ensureAuthenticated, (req, res) => {
    res.render("edit");
});

router.post("/edit", ensureAuthenticated, (req, res, next) => {
    req.user.displayName = req.body.displayname;
    req.user.bio = req.body.bio;
    User.findOneAndUpdate({ username: req.user.username }, { displayName: req.user.displayName, bio: req.user.bio}, (err) => {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/edit");
    });
    req.user.save();
});

module.exports = router;