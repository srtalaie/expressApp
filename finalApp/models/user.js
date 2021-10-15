let mongoose = require("mongoose");

let bcrypt = require("bcrypt-nodejs");
let SALT_FACTOR = 10;

let userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    displayName: { type: String },
    bio: { type: String }
});

userSchema.methods.name = function(){
    return this.displayName || this.username
};

userSchema.methods.checkPassword = function(guess, done){
    if (!this.password) { throw new Error('No user Password') }
    bcrypt.compare(guess, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
}

let noop = function() {};

userSchema.pre("save", function(done){
    let user = this;
    if(!user.isModified("password")){
        return done;
    };

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword){
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        });
    });
});

let User = mongoose.model("User", userSchema);
module.exports = User;