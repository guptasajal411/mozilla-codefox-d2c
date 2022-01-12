const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const saltRounds = 10;

exports.getRegister = (req, res) => {
    res.render("register");
}

exports.postRegister = (req, res) => {
    User.findOne({ email: req.body.email }, async function (err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            if (foundUser == null) {
                bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        regNo: req.body.regNo
                    });
                    await newUser.save();
                    res.redirect("/login");
                });
            } else {
                res.redirect("/login");
            }
        }
    });
}

exports.getLogin = (req, res) => {
    res.render("login");
}
exports.postLogin = (req, res) => {
    User.findOne({ email: req.body.email }, async function (err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
                    if (result === true){
                        res.redirect("https://dare2compete.com/")
                    } else {
                        res.redirect("login");
                    }
                });
            } else {
                res.render("login");
            }
        }
    });
}