const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const Beneficiario = require("./models/beneficiario");
const Usuario = require("./models/usuario");
const Profissional = require("./models/profissional");

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

app.post("/api/beneficiarios", (req, res, next) => {
  const beneficiario = new Beneficiario({
    nome: req.body.nome,
    dataNascimento: req.body.dataNascimento,
    cpf: req.body.cpf,
    rg: req.body.rg,
    email: req.body.email,
    telefone: req.body.telefone,
    exames: req.body.exames,
  });
  beneficiario.save();
  console.log(beneficiario);
  res.status(201).json({ mensagem: "Beneficiário inserido com sucesso!" });
});

app.get("/api/beneficiarios", (req, res, next) => {
  Beneficiario.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      beneficiarios: documents,
    });
  });
});

app.get("/api/beneficiarios/:rg", (req, res, next) => {
  Beneficiario.findOne({ rg: req.params.rg }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({
      mensagem: "Beneficiários encontrado",
      beneficiarios: resultado,
    });
  });
});

app.put("/api/beneficiarios/:rg", (req, res, next) => {
  Beneficiario.updateOne(
    { rg: req.params.rg }, // <-- find stage
    {
      $set: {
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        cpf: req.body.cpf,
        rg: req.body.rg,
        fone: req.body.fone,
        email: req.body.email,
        telefone: req.body.telefone,
        exames: req.body.exames,
      },
    }
  ).then((result) => {
    res.status(200).json({ message: "Beneficiário alterado com sucesso!" });
  });
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

app.post("/api/profissionais", (req, res, next) => {
  const profissional = new Profissional({
    nome: req.body.nome,
    siglaConselho: req.body.siglaConselho,
    numeroConselho: req.body.numeroConselho,
    estadoConselho: req.body.estadoConselho,
    user: req.body.user,
  });
  profissional.save();
  console.log(profissional);
  res.status(201).json({ mensagem: "Profissional inserido com sucesso!" });
});

app.get("/api/profissionais", (req, res, next) => {
  Profissional.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      profissionais: documents,
    });
  });
});

app.get("/api/profissionais/:user", (req, res, next) => {
  Profissional.findOne({ user: req.params.user }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({
      mensagem: "Profissional encontrado",
      profissionais: resultado,
    });
  });
});

app.put("/api/profissionais/:user", (req, res, next) => {
  Profissional.updateOne(
    { user: req.params.user }, // <-- find stage
    {
      $set: {
        nome: req.body.nome,
        siglaConselho: req.body.siglaConselho,
        numeroConselho: req.body.numeroConselho,
        estadoConselho: req.body.estadoConselho,
        user: req.body.user,
      },
    }
  ).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
});

module.exports = app;
