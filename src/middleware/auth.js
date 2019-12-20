const sendMessage = require("../utils/sendMessage");

module.exports = function (req, res, next) {
  const token = req.header("Authentication");
  if (!token) return res.status(401).json(sendMessage("Não autorizado"));
  return next();
};
