const mongoose = require("mongoose");

module.exports = function() {
  const db = "mongodb://localhost/desafio-accenture";
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Connectado ao MongoDB..."))
    .catch(err =>
      console.error("Não foi possível connectar ao MongoDB", err.mesage)
    );
};
