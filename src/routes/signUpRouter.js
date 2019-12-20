const express = require("express");
const router = express.Router();
const SignUpController = require("../controllers/SignUpController");

router.post("/", SignUpController.store);

module.exports = router;
