const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    regNo: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

module.exports = User;