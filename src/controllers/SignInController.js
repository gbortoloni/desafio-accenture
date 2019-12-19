const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const sendMessage = require("../utils/sendMessage");

class SignInController {
  async auth(req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json(sendMessage("Usuário e/ou senha inválidos"));

    const validPassword = await bcrypt.compare(req.body.senha, user.senha);
    if (!validPassword)
      return res.status(401).json(sendMessage("Usuário e/ou senha inválidos"));

    res.json(
      _.pick(user, ["_id", "createdAt", "updatedAt", "ultimoLogin", "token"])
    );
  }
}
module.exports = new SignInController();
