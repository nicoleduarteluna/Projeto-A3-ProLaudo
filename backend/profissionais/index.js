const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const Profissional = require("../models/profissional");

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

app.listen(5000, () => {
    console.log('Profissionais. Porta 5000');
});
