const { User } = require("../models/users");

class SingUpController {
  async showAll(req, res) {
    const users = await User.find();
    res.json(users);
  }
}

module.exports = new SingUpController();
