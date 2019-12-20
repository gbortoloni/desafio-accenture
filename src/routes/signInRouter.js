const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");
const SignInController = require("../controllers/SignInController");

router.get("/me/:id", auth, SignInController.showUser);
router.post("/", SignInController.auth);

module.exports = router;
