const express = require("express");
const { Router } = express;
const routerProduct = Router();
/* --------- importo clase Contenedor la reutilizare para el desafio -------- */
const Contenedor = require("./Contenedor");

/* ------------------------ instancio obj de la clase ----------------------- */
const productos = new Contenedor("./src/productos.txt");

/* ----------------------------endpoint para las rutas --------------------------------- */
// 1) /api/prodtuctos -> devuelve lista de productos
routerProduct.get("/listar", async (req, res) => {
  const data = await productos.getAll();
  res.render("listarProductos", { data });
});

// 3) POST '/api/productos' -> recibe y agrega un producto

routerProduct.post("/", async (req, res) => {
  const product = req.body;
  /* ----------------- agrego nuevo producto y devuelvo si id ----------------- */
  const id = await productos.save(product);
  /* con ese id lo busco en el Array y devuelvo la respuesta con dicho producto -------------------- */
  const pdAgregado = await productos.getById(id);
  res.redirect("/");
});

module.exports = routerProduct;
