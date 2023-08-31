const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const Usuario = require("../models/usuario");

mongoose
  .connect(
    "mongodb+srv://admin:admin123456@cluster0.ganbwc9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/usuarios", (req, res, next) => {
  const usuario = new Usuario({
    user: req.body.user,
    password: req.body.password,
    type: req.body.type,
    rg: req.body.rg,
  });
  usuario.save();
  console.log(usuario);
  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
});

app.get("/api/usuarios", (req, res, next) => {
  Usuario.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      usuarios: documents,
    });
  });
});

app.get("/api/usuarios/:user", (req, res, next) => {
  Usuario.findOne({ user: req.params.user }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({
      mensagem: "Profissional encontrado",
      usuarios: resultado,
    });
  });
});

app.listen(6000, () => {
    console.log('Usuários. Porta 6000');
});
