const express = require("express");
const router = express.Router();
const SignInController = require("../controllers/SignInController");

router.post("/", SignInController.auth);

module.exports = router;
