const express = require('express');
const app = express();
const codefoxController = require("../controllers/codefoxController");

app
    .route("/register")
    .get(codefoxController.getRegister)
    .post(codefoxController.postRegister);

app
    .route("/login")
    .get(codefoxController.getLogin)
    .post(codefoxController.postLogin);

module.exports = app;