const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
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
              type: Number,
              min: 2,
              max: 3,
              required: true
            }
          }
        ],
        required: true
      },
      ultimoLogin: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
  )
);

exports.User = User;
