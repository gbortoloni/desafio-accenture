const express = require("express");
const cors = require("cors");

const signUpRouter = require("../routes/signUpRouter");
const signInRouter = require("../routes/signInRouter");
const notFoundRouter = require("../routes/notFoundRouter");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/signup", signUpRouter);
  app.use("/api/signin", signInRouter);
  app.use("/", notFoundRouter);
};
