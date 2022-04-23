const express = require("express");
const router = express.Router();
const pdModel = require("../models/productosModels");

//obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const resp = await pdModel.getAll();
    res.json(resp);
  } catch (error) {
    console.log(error);
  }
});
//obtener producto por id
router.get("/:id", async (req, res) => {
  try {
    const resp = await pdModel.getById(parseInt(req.params.id));
    res.json(resp);
  } catch (error) {
    console.log(error);
  }
});
//agrega un nuevo producto
router.post("/", async (req, res) => {
  try {
    const resp = await pdModel.save(req.body);
    res.json(resp);
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const resp = await pdModel.update(req.body, id);
    res.json(resp);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const borrado = await pdModel.getById(id);
    const resp = await pdModel.deleteById(id);
    res.json({ borrado: borrado });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
