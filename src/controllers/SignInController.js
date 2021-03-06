const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/users");
const sendMessage = require("../utils/sendMessage");

class SignInController {
  async showUser(req, res) {
    const user = await User.findOne({ _id: req.params.id });
    try {
      const tokenHeaderBearer = req.header("Authentication");
      const tokenHeader = tokenHeaderBearer.substring(
        tokenHeaderBearer.indexOf(" ") + 1,
        tokenHeaderBearer.lenght,
      );
      const validToken = user.token === tokenHeader;
      if (!validToken) {
        return res.status(401).json(sendMessage("Não autorizado"));
      }

      const decoded = jwt.verify(tokenHeader, process.env.JWT_PRIVATE_KEY);

      const dateJWT = new Date(decoded.iat * 1000);
      const dateNow = new Date();
      const diffMs = dateNow - dateJWT;
      const minutes = Math.floor(diffMs / 1000 / 60);

      if (minutes > 30) {
        return res.status(403).json(sendMessage("Sessão inválida"));
      }

      return res.json(
        _.pick(user, [
          "_id",
          "nome",
          "email",
          "telefones",
          "createdAt",
          "updatedAt",
          "ultimoLogin",
          "token",
        ]),
      );
    } catch (ex) {
      return res.json(sendMessage(ex.message));
    }
  }

  async auth(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json(sendMessage("Usuário e/ou senha inválidos"));
      }

      const validPassword = await bcrypt.compare(req.body.senha, user.senha);
      if (!validPassword) {
        return res
          .status(401)
          .json(sendMessage("Usuário e/ou senha inválidos"));
      }

      const newToken = user.generateAuthToken();
      await User.updateOne(
        { _id: user._id },
        { token: newToken, ultimoLogin: new Date() },
      );
      user.token = newToken;

      return res.json(
        _.pick(user, ["_id", "createdAt", "updatedAt", "ultimoLogin", "token"]),
      );
    } catch (ex) {
      return res.status(400).json(sendMessage(ex.message));
    }
  }
}
module.exports = new SignInController();
