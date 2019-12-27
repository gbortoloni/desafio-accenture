const express = require("express");

const router = express.Router();
const sendMessage = require("../utils/sendMessage");

router.get("*", async (req, res) => {
  res.status(404).send(sendMessage("Rota não encontrada."));
});

module.exports = router;
