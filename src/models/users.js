const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    senha: {
      type: String,
      required: true
    },
    telefones: {
      type: [
        {
          numero: {
            type: String,
            required: true
          },
          ddd: {
            type: String,
            minlenght: 2,
            maxlenght: 3,
            required: true
          }
        }
      ],
      required: true
    },
    ultimoLogin: {
      type: Date,
      default: Date.now
    },
    token: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, "123456");
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
