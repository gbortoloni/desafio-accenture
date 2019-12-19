const express = require("express");
const router = express.Router();
const SingUpController = require("../controllers/SingUpController");

router.get("/", SingUpController.showAll);
router.post("/", SingUpController.store);

module.exports = router;
