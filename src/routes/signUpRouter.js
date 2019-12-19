const express = require("express");
const router = express.Router();
const SignUpController = require("../controllers/SignUpController");

router.get("/", SignUpController.showAll);
router.post("/", SignUpController.store);

module.exports = router;
