const { query } = require("express");
const express = require("express");
const { Router } = express;
const routerProduct = Router();
/* --------- importo clase Contenedor la reutilizare para el desafio -------- */
const Contenedor = require("./Contenedor");

/* ------------------------ instacnio obj de la clase ----------------------- */
const productos = new Contenedor("./src/productos.txt");

/* ----------------------------endpoint para las rutas --------------------------------- */
// 1) /api/prodtuctos -> devuelve lista de productos formato json
routerProduct.get("/", async (req, res) => {
  const pd = await productos.getAll();
  res.json({ pd });
});
// 2) /api/productos/:id -> devuelve un producto según su id. muestra mensaje si no lo existe

routerProduct.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pd = await productos.getById(id);
    if (pd) {
      res.json({ pd });
    } else {
      res.json({ error: `producto con id.${id} no encontrado` });
    }
  } catch (error) {
    return error.message();
  }
});

// 3) POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

routerProduct.post("/", async (req, res) => {
  const product = req.body;
  /* ----------------- agrego nuevo producto y devuelvo si id ----------------- */
  const id = await productos.save(product);
  /* con ese id lo busco en el Array y devuelvo la respuesta con dicho producto -------------------- */
  const pdAgregado = await productos.getById(id);
  res.json({ agregado: pdAgregado });
});

// 5)DELETE '/api/productos/:id' -> elimina un producto según su id

routerProduct.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const listado = await productos.getById(id);
    if (listado) {
      const eliminado = await productos.deleteById(id);
      const data = await productos.getAll();
      res.json({ eliminado });
    } else {
      res.json({ error: `producto con id.${id} no encontrado` });
    }
  } catch (error) {
    return error.message();
  }
});

module.exports = routerProduct;
