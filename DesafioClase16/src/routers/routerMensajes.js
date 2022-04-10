const express = require("express");
const router = express.Router();
const msjModels = require("../models/mensajesModels");


router.get("/", async (req, res) => {
  const data = await msjModels.getMessages();
  res.json("listarMensajes", { data });
});

router.post("/", async (req, res) => {
  const data = req.body;
  const mensaje = await msjModels.addMessage(data);
  const mensajeAgregado = await msjModels.getMessages();
  res.render(mensajeAgregado);
});

module.exports = router;
