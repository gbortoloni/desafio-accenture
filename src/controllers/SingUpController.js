const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const sendMessage = require("../utils/sendMessage");

class SingUpController {
  async showAll(req, res) {
    const users = await User.find();
    res.json(users);
  }

  async store(req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json(sendMessage("E-mail já existente"));

    user = new User(_.pick(req.body, ["nome", "email", "senha", "telefones"]));
    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(user.senha, salt);

    const token = user.generateAuthToken();
    user.token = token;

    await user.save();

    res.json(
      _.pick(user, ["_id", "createdAt", "updatedAt", "ultimoLogin", "token"])
    );
  }
}

module.exports = new SingUpController();
