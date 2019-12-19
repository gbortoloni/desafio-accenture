const express = require("express");
const cors = require("cors");

const singupRouter = require("../routes/singUpRouter");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/singup", singupRouter);
};
