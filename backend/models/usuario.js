const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  rg: { type: String, required: true }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
