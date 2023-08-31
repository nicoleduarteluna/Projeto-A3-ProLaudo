const mongoose = require("mongoose");

const clienteSchema = mongoose.Schema({
  nome: { type: String, required: true },
  siglaConselho: { type: String, required: true },
  numeroConselho: { type: String, required: true },
  estadoConselho: { type: String, required: true },
  user: { type: String, required: false  }
});

module.exports = mongoose.model("Profissional", clienteSchema);
