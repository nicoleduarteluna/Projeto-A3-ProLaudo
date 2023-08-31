const mongoose = require("mongoose");

const clienteSchema = mongoose.Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  cpf: { type: String, required: true },
  rg: { type: String, required: true },
  email: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "00000000" },
  exames: [{ nomeExame: String, dataExecucao: String, statusLaudo: String, laudo: String }],
});

module.exports = mongoose.model("Beneficiario", clienteSchema);
