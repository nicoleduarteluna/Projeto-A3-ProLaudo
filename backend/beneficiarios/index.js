const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const Beneficiario = require("../models/beneficiario");

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

app.listen(4000, () => {
    console.log('Beneficiários. Porta 4000');
});
